import { Router } from "express";
import { supabase } from "../app.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const {
    username,
    password,
    name,
    birthDate,
    location,
    city,
    email,
    sexual_identity,
    sexual_preference,
    racial_preference,
    meeting_interest,
    hobby,
    images,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: hashPassword,
  });
  if (error) {
    res.status(400).send(error.message);
  } else {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username: username,
          password: hashPassword,
          name: name,
          birthDate: birthDate,
          location: location,
          city: city,
          email: email,
          sexual_identity: sexual_identity,
          sexual_preference: sexual_preference,
          racial_preference: racial_preference,
          meeting_interest: meeting_interest,
          created_at: new Date().toISOString(),
          last_logged_in: new Date().toISOString(),
        },
      ])
      .select("user_id");
    if (error) {
      return res.status(500).send(error.message);
    } else {
      const userId = data[0].user_id;
      const hobbyList = req.body.hobby?.slice(0, 10) || [];
      if (hobbyList.length > 0) {
        const { data: hobbyData, error: hobbyError } = await supabase
          .from("hobbies_interests")
          .insert(
            hobbyList.map((hobby) => {
              return {
                user_id: userId,
                hob_list: hobby,
              };
            })
          );

        if (hobbyError) {
          return res.status(500).send(hobbyError.message);
        }
      }
    }
    const userId = data[0].user_id;
    if (error) {
      res.status(500).send(error.message);
    } else {
      const files = images?.slice(0, 5) || [];
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileName = uuidv4() + "_" + file.name;
          const { data: fileData, error: fileError } = await supabase.storage
            .from("userPictures")
            .upload(fileName, file.data);
          if (fileError) {
            return res.status(500).send(fileError.message);
          }
        }
        const { data: insertData, error: insertError } = await supabase
          .from("pictures")
          .insert([{ user_id: userId, pic_url: fileData.key }]);
        if (insertError) {
          return res.status(500).send(insertError.message);
        }
      }
      return res.json({ message: "New User has been registed successfully" });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const { data: userdata, error } = await supabase
    .from("users")
    .select("user_id, username, name, password")
    .eq("username", username);

  if (error || !userdata || userdata.length === 0) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const storedPassword = userdata[0].password;

  if (!storedPassword) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const isValidPassword = await bcrypt.compare(password, storedPassword);

  if (!isValidPassword) {
    res.status(401).send("Invalid password");
    return;
  }

  const { data, error: updateError } = await supabase
    .from("users")
    .update({ last_logged_in: new Date().toISOString() })
    .eq("user_id", userdata[0].user_id);

  if (updateError) {
    console.log(updateError);
    res.status(500).send("Server error");
  } else {
    const token = jwt.sign(
      {
        user_id: userdata[0].user_id,
        username: userdata[0].username,
        name: userdata[0].name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }
});

export default authRouter;
