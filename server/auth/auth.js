import { Router } from "express";
import { supabase } from "../app.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import { supabaseUpload } from "../utils/upload.js";

const authRouter = Router();

const multerUpload = multer({
  dest: "uploads/",
  limits: { fileSize: 10000000 },
});
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 5 }]);

authRouter.post("/register", avatarUpload, async (req, res) => {
  console.log(req.files.avatars);
  console.log("connect to back-end");
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
    const cloudUpload = await supabaseUpload(req.files);
    if (validImages.length === 0) {
      return res.status(400).send("No images provided");
    }
    const userId = data[0].user_id;
    const pictureData = validImages.map((image) => ({
      user_id: userId,
      pic_url: image.url,
    }));

    const { data: insertData, error: insertError } = await supabase
      .from("pictures")
      .insert(pictureData);
    if (insertError) {
      return res.status(500).send(insertError.message);
    }
  }
  return res.json({ message: "New User has been registed successfully" });
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
