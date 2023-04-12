import { supabase } from "../app.js";
import fs from "fs/promises";

export const supabaseUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.avatar) {
    const fileBuffer = await fs.readFile(file.path);
    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(file.name, fileBuffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error(error);
      return;
    }

    fileUrl.push({
      url: data.Key,
      publicId: data.Key,
    });

    await fs.unlink(file.path);
  }
  return fileUrl;
};

export { supabaseUpload };
