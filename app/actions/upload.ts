"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadMediaAction(base64File: string, folder: string, resourceType: "image" | "video" | "raw" = "image") {
  try {
    const result = await uploadToCloudinary(base64File, folder, resourceType);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Upload Media Error:", error);
    return { success: false, error: error.message || "Failed to upload media" };
  }
}
