import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "general"
    const resourceType = formData.get("resourceType") as "image" | "video" || "image"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`

    const result = await uploadToCloudinary(base64File, folder, resourceType)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload API Error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
