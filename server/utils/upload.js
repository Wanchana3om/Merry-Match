import { supabase } from "../app.js";
import fs from "fs/promises";

export const supabaseUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.avatar) {
    const fileBuffer = await fs.readFile(file.path);
    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(fileBuffer, file.name, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to upload file." });
    }

    fileUrl.push({
      url: data.url,
      publicId: data.key,
    });
    // fileUrl.push(data.Key);

    await fs.unlink(file.path);
  }
  return fileUrl;
};
