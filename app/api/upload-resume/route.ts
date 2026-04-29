import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF allowed" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

const uploadResult = await new Promise<any>((resolve, reject) => {
  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "raw",
        folder: "career-resumes",
        use_filename: true,
        unique_filename: true,
        filename_override: file.name,
      },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      }
    )
    .end(buffer);
});

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      downloadUrl: uploadResult.secure_url.replace(
        "/raw/upload/",
        "/raw/upload/fl_attachment/"
      ),
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "PDF upload failed" },
      { status: 500 }
    );
  }
}