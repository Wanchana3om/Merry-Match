import { Router } from "express";
import { supabase } from "../app.js";
import { v4 as uuidv4 } from "uuid";

const usersRouter = Router();

usersRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const { data, error } = await supabase
    .from("users")
    .select("*, pictures(pic_url)")
    .match({ user_id: userId });

  if (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }

  return res.json(data);
});

usersRouter.put("/:userId", async (req, res) => {
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
    images,
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
  const files = req.files;
  const fileCount = Math.min(files.length, 5);

  for (let i = 0; i < fileCount; i++) {
    const file = files[i];
    const fileName = uuidv4() + "_" + file.name;
    const { data: fileData, error: fileError } = await supabase.storage
      .from("userPictures")
      .upload(fileName, file.data);
    if (fileError) {
      console.log(fileError);
      return res.status(500).send("Server error");
    }
    const { data: insertData, error: insertError } = await supabase
      .from("pictures")
      .update([{ pic_url: fileData.key }])
      .eq("user_id", userId);
    if (insertError) {
      console.log(insertError);
      return res.status(500).send("Server error");
    }
  }
  return res.json({ message: "User profile updated successfully" });
});

export default usersRouter;
