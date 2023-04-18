import { Router } from "express";
import { supabase } from "../app.js";
import { v4 as uuidv4 } from "uuid";

const usersRouter = Router();

// read profile
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
      }
      if (deleteError) {
        console.log(deleteError);
        return res.status(500).send("Server error");
      }
      if (insertError) {
        console.log(insertError);
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

export default usersRouter;

// const files = req.files;
// const fileCount = Math.min(files.length, 5);

// for (let i = 0; i < fileCount; i++) {
//   const file = files[i];
//   const fileName = uuidv4() + "_" + file.name;
//   const { data: fileData, error: fileError } = await supabase.storage
//     .from("userPictures")
//     .upload(fileName, file.data);
//   if (fileError) {
//     console.log(fileError);
//     return res.status(500).send("Server error");
//   }
//   const { data: insertData, error: insertError } = await supabase
//     .from("pictures")
//     .update([{ pic_url: fileData.key }])
//     .eq("user_id", userId);
//   if (insertError) {
//     console.log(insertError);
//     return res.status(500).send("Server error");
//   }
// }
