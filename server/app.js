import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import authRouter from "./auth/auth.js";
import usersRouter from "./users/users.js";
import merryRouter from "./merrylist/merrylist.js";
import merryRejectRouter from "./merrylist/merryReject.js";
import chatRouther from "./merrylist/chat.js";
import complaintRouter from "./complaint/complaint.js";
// import fileUploadMiddleware from "./middlewares/fileUploadMiddleware.js";

dotenv.config();

export const supabase = createClient(
  "https://lulfbwiluepkywyznarx.supabase.co",
  process.env.SERVICE_KEY
);

async function init() {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  // app.use("/auth", fileUploadMiddleware, authRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/merrylist", merryRouter);
  app.use("/merryreject", merryRejectRouter);
  app.use("/chat", chatRouther);
  app.use("/complaint", complaintRouter);

  app.listen(port, () => {
    console.log("Server listening on port 3000");
  });
}

init();
