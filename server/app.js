import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import authRouter from "./auth/auth.js";
import usersRouter from "./users/users.js";
import fileUploadMiddleware from "./middlewares/fileUploadMiddleware.js";

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

  app.use("/auth", fileUploadMiddleware, authRouter);
  app.use("/users", usersRouter);

  app.listen(port, () => {
    console.log("Server listening on port 3000");
  });
}

init();