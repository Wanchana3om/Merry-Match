import { Router } from "express";
import { supabase } from "../app";
import { v4 as uuidv4 } from "uuid";

const usersRouter = express.Router();

usersRouter.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const {
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

  const { data, error } = await supabase
    .from("users")
    .update({
      name: name,
      gender: gender,
      email: email,
      location: location,
      city: city,
      sexual_preference: sexual_preference,
      nation: nation,
      meeting_interest: meeting_interest,
      about_me: about_me,
    })
    .match({ user_id: userId });

  if (error) {
    console.log(error);
    res.status(500).send("Server error");
    return;
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
      res.status(500).send("Server error");
      return;
    }
    const { data: insertData, error: insertError } = await supabase
      .from("pictures")
      .update([{ pic_url: fileData.key }])
      .eq("user_id", userId);
    if (insertError) {
      console.log(insertError);
      res.status(500).send("Server error");
      return;
    }
  }
  res.json({ message: "User profile updated successfully" });
});

export default usersRouter;
