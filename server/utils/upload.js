import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

export const cloudinaryUpload = async (files) => {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("No files provided.");
  }
  const fileUrl = [];

  for (let file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "merrymatch/pictures",
      type: "private",
    });
    fileUrl.push({ url: result.secure_url, publicId: result.public_id });

    await fs.unlink(file.path);
  }
  return fileUrl;
};
