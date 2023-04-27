import { Router } from "express";
import { supabase } from "../app.js";

const usersRouter = Router();

// read user profile
usersRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { data, error } = await supabase
      .from("users")
      .select(
        `user_id, username, name, birthDate, email, location, city, sexual_preference, sexual_identity, meeting_interest, racial_preference, about_me, pictures(pic_url), hobbies_interests(hob_list)`
      )
      .match({ user_id: userId });
    if (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// update profile
usersRouter.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      name,
      birthDate,
      location,
      city,
      email,
      sexual_identity,
      sexual_preference,
      racial_preference,
      meeting_interest,
      about_me,
      hobby,
      image,
    } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        name: name,
        birthDate: birthDate,
        location: location,
        city: city,
        email: email,
        sexual_identity: sexual_identity,
        sexual_preference: sexual_preference,
        racial_preference: racial_preference,
        meeting_interest: meeting_interest,
        about_me: about_me,
      })
      .match({ user_id: userId });

    if (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }

    const hobbyList = req.body.hobby?.slice(0, 10) || [];
    if (hobbyList.length > 0) {
      const { data: hobbies, error: hobbyError } = await supabase
        .from("hobbies_interests")
        .select("*")
        .eq("user_id", userId);
      const exitingHobbyList = hobbies.map((hobby) => hobby.hob_list);
      // if hobby in db and hobby form req equal
      if (JSON.stringify(exitingHobbyList) !== JSON.stringify(hobbyList)) {
        const { error: deleteError } = await supabase
          .from("hobbies_interests")
          .delete()
          .eq("user_id", userId);
        if (deleteError) {
          console.log(deleteError);
          return res.status(500).send("Server error");
        }

        const { data: hobbyData, error: insertError } = await supabase
          .from("hobbies_interests")
          .insert(
            hobbyList.map((hobby) => {
              return {
                user_id: userId,
                hob_list: hobby,
              };
            })
          );
        if (insertError) {
          console.log(insertError);
        }
      }
    }

    const newUrls = image.map((url) => url.url);
    const { data: exitingPictures, error: exitingPicturesError } =
      await supabase.from("pictures").select("*").eq("user_id", userId);

    if (exitingPicturesError) {
      console.log(exitingPicturesError);
      return res.status(500).send("Server error");
    }
    const exitingUrls = exitingPictures.map((picture) => picture.pic_url);
    if (JSON.stringify(exitingUrls) !== JSON.stringify(newUrls)) {
      const { error: deleteError } = await supabase
        .from("pictures")
        .delete()
        .eq("user_id", userId);
      if (deleteError) {
        console.log(deleteError);
        return res.status(500).send("Server error");
      }
      const { data: insertData, error: insertError } = await supabase
        .from("pictures")
        .insert(
          image.map((url) => {
            return {
              user_id: userId,
              pic_url: url.url,
            };
          })
        );
      if (insertError) {
        console.log(insertError);
        return res.status(500).send("Server error");
      }
    }
    return res.status(200).send("User profile updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Example search
// GET /users?keyword=john&meeting_interest=male&min_age=20&max_age=30
// {
//   "keyword": "hobby",
//   "meeting_interest": "Long-term commitment,Partners,Friends",
//   "min_age": "20",
//   "max_age": "50"
// }

// search default by user meeting interest and ages +-10 years and search by keyword & meeting interest & age
usersRouter.get("/merrymatch/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { keyword, meeting_interest, min_age, max_age } = req.query;
    if (
      typeof req.query === "undefined" ||
      Object.keys(req.query).length === 0
    ) {
      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select("birthDate, sexual_preference, meeting_interest")
        .eq("user_id", userId);
      console.log(userData);
      if (userDataError) throw userDataError;

      const maxAge = 10;
      const minBirthYear =
        new Date(userData[0].birthDate).getFullYear() - maxAge;
      const minBirthDate = new Date(
        minBirthYear,
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .slice(0, 10);

      const minAge = 10;
      const maxBirthYear =
        new Date(userData[0].birthDate).getFullYear() + minAge;
      const maxBirthDate = new Date(
        maxBirthYear,
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .slice(0, 10);

      const { data: defaultData, error: defaultDataError } = await supabase
        .from("users")
        .select(
          `user_id, username, name, birthDate, email, location, city, sexual_preference, sexual_identity, meeting_interest, racial_preference, about_me, pictures(pic_url), hobbies_interests(hob_list)`
        )
        .neq("user_id", userId)
        .eq("sexual_identity", userData[0].sexual_preference)
        .eq("meeting_interest", userData[0].meeting_interest)
        .gte("birthDate", minBirthDate)
        .lte("birthDate", maxBirthDate);
      if (defaultDataError) throw defaultDataError;

      // Don't show user that already in own merrylist
      const { data: filterData, error: filterDataError } = await supabase
        .from("merry_status")
        .select("mer_id, user_id")
        .eq("mer_id", userId);
      if (filterDataError) throw filterDataError;
      const alreadyUser = filterData.map((user) => user.user_id);
      const filteredData = defaultData.filter(
        (data) => !alreadyUser.includes(data.user_id)
      );
      console.log(filterData);
      console.log("and");
      console.log(filteredData);
      return res.json(filteredData);
    }

    // search with request
    const maxAge = parseInt(max_age);
    const minBirthYear = new Date().getFullYear() - maxAge;
    const minBirthDate = `${minBirthYear}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}`;
    const minAge = parseInt(min_age);
    const maxBirthYear = new Date().getFullYear() - minAge;
    const maxBirthDate = `${maxBirthYear}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}`;

    const query = supabase
      .from("users")
      .select(
        `user_id, username, name, birthDate, email, location, city, sexual_preference, sexual_identity, meeting_interest, racial_preference, about_me, pictures(pic_url), hobbies_interests(hob_list)`
      )
      .neq("user_id", userId);

    if (keyword && meeting_interest && min_age && max_age) {
      // Add keyword, meeting_interest and age filters
      query
        .ilike("hobbies_interests.hob_list", `%${keyword}%`)
        .in("meeting_interest", meeting_interest.split(","))
        .gte("birthDate", minBirthDate)
        .lte("birthDate", maxBirthDate);
    } else if (keyword && meeting_interest) {
      // Add keyword and meeting_interest filters
      query
        .ilike("hobbies_interests.hob_list", `%${keyword}%`)
        .in("meeting_interest", meeting_interest.split(","));
    } else if (keyword && min_age && max_age) {
      query
        .ilike("hobbies_interests.hob_list", `%${keyword}%`)
        .gte("birthDate", minBirthDate)
        .lte("birthDate", maxBirthDate);
    } else if (meeting_interest && min_age && max_age) {
      query
        .in("meeting_interest", meeting_interest.split(","))
        .gte("birthDate", minBirthDate)
        .lte("birthDate", maxBirthDate);
    } else {
      // Query with one filter
      if (keyword) {
        query.ilike("hobbies_interests.hob_list", `%${keyword}%`);
      }
      if (meeting_interest) {
        query.in("meeting_interest", meeting_interest.split(","));
      }
      if (min_age && max_age) {
        query.gte("birthDate", minBirthDate).lte("birthDate", maxBirthDate);
      }
    }

    const { data, error } = await query;
    const getHobbyData = data.filter((row) =>
      row.hobbies_interests.some((hobby) => hobby.hob_list.includes(keyword))
    );
    if (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }

    // Don't show user that already in own merrylist
    const { data: filterData, error: filterDataError } = await supabase
      .from("merry_status")
      .select("mer_id, user_id")
      .eq("mer_id", userId);
    if (filterDataError) throw filterDataError;
    const alreadyUser = filterData.map((user) => user.user_id);
    const filteredData = getHobbyData.filter(
      (data) => !alreadyUser.includes(data.user_id)
    );
    const filteredData2 = data.filter(
      (data) => !alreadyUser.includes(data.user_id)
    );

    if (keyword) {
      console.log(filteredData);
      return res.json(filteredData);
    } else {
      console.log(filteredData2);
      return res.json(filteredData2);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// ---------------delete user----------------------

usersRouter.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    const { error: error2 } = await supabase
      .from("merry_list")
      .delete()
      .eq("mer_id", userId);

    if (error2) {
      throw error2;
    }

    res.json({ message: "Delete user success." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default usersRouter;
