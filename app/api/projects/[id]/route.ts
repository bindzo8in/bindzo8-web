import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { deleteFromCloudinary } from "@/lib/cloudinary"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const item = await prisma.project.findUnique({
      where: { id: (await params).id, deletedAt: null },
    })
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await request.json()
    const item = await prisma.project.update({
      where: { id: (await params).id },
      data: body,
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const item = await prisma.project.findUnique({
      where: { id: (await params).id },
      select: { mediaPublicId: true, mediaType: true }
    })

    if (item?.mediaPublicId) {
      await deleteFromCloudinary(item.mediaPublicId, item.mediaType as "image" | "video")
    }

    await prisma.project.update({
      where: { id: (await params).id },
      data: { 
        deletedAt: new Date(),
        mediaPublicId: null
      },
    })
    return new Response(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}


