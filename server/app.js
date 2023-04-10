import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const supabase = createClient(
  "https://lulfbwiluepkywyznarx.supabase.co",
  process.env.SERVICE_KEY
);

// แก้ไข้ได้ตั้งแต่บรรทัดนี้ลงไป
app.get("/users", async (req, res) => {
  try {
    const { data: users, error } = await supabase.from("users").select("*");
    if (error) throw error;
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .insert(req.body)
      .single();
    if (error) throw error;
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// ถึงบรรทัดนี้

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
