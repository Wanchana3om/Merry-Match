import { Router } from "express";
import { supabase } from "../app";
import { v4 as uuidv4 } from "uuid";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const {
    username,
    password,
    name,
    gender,
    email,
    location,
    city,
    sexual_preference,
    nation,
    meeting_interest,
    about_me,
  } = req.body;
  const { user, error } = await supabase.auth.signUp({
    username: username,
    password: password,
  });
  if (error) {
    res.status(400).send(error.message);
  } else {
    const { data, error } = await supabase.from("users").insert([
      {
        username: username,
        name: name,
        gender: gender,
        email: email,
        location: location,
        city: city,
        sexual_preference: sexual_preference,
        nation: nation,
        meeting_interest: meeting_interest,
        about_me: about_me,
        created_at: new Date().toISOString(),
        last_logged_in: new Date().toISOString(),
      },
    ]);
    if (error) {
      res.status(500).send(error.message);
    } else {
      const files = req.files;
      const fileCount = Math.min(files.length, 5);
      for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        const fileName = uuidv4() + "_" + file.name;
        const { data: fileData, error: fileError } = await supabase.storage
          .from("userPictures")
          .upload(fileName, file.data);
        if (fileError) {
          res.status(500).send(fileError.message);
          return;
        }
      }
      const { data: insertData, error: insertError } = await supabase
        .from("pictures")
        .insert([{ user_id: user.id, pic_url: fileData.key }]);
      if (insertError) {
        res.status(500).send(insertError.message);
        return;
      }
      res.json({ message: "New User has been registed successfully" });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { user, error } = await supabase.auth.singIn({
    username: username,
    password: password,
  });
  if (error) {
    res.status(401).send(error.message);
  } else {
    const { data, error } = await supabase
      .from("users")
      .update({ last_logged_in: new Date().toISOString() })
      .eq("user_id", user?.id);

    if (error) {
      console.log(error);
      res.status(500).send("Server error");
    } else {
      const token = user?.asscess_token || null;
      res.json({ token });
    }
  }
});

export default authRouter;
