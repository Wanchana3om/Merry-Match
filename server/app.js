import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import authRouter from "./auth/auth";
import usersRouter from "./users/editProfile";
dotenv.config();

export const supabase = createClient(
  "https://lulfbwiluepkywyznarx.supabase.co",
  process.env.SERVICE_KEY
);

async function init() {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.get("/users", async (req, res) => {
  //   try {
  //     const { data: users, error } = await supabase.from("users").select("*");
  //     if (error) throw error;
  //     res.send(users);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send(error);
  //   }
  // });

  app.use("/auth", authRouter);
  app.use("/users", usersRouter);

  app.listen(port, () => {
    console.log("Server listening on port 3000");
  });
}

init();
