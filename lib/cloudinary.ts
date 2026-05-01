import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export async function uploadToCloudinary(
  file: string,
  folder: string,
  resourceType: "image" | "video" = "image"
) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `bindzo8/${folder}`,
      resource_type: resourceType,
    })
    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error)
    throw new Error("Failed to upload to Cloudinary")
  }
}

export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" = "image") {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
  } catch (error) {
    console.error("Cloudinary Delete Error:", error)
    // We don't necessarily want to fail the whole operation if Cloudinary delete fails,
    // but we log it for tracking.
  }
}
