import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get("cursor")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""

  try {
    const items = await prisma.teamMember.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { position: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: { dateOfJoining: "asc" },
    })

    let nextCursor: string | undefined = undefined
    if (items.length > limit) {
      const nextItem = items.pop()
      nextCursor = nextItem?.id
    }

    return NextResponse.json({
      items,
      nextCursor,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const item = await prisma.teamMember.create({
      data: {
        name: body.name,
        position: body.position,
        dateOfJoining: new Date(body.dateOfJoining),
        mediaUrl: body.mediaUrl,
        mediaType: body.mediaType,
        mediaPublicId: body.mediaPublicId,
      },
    })
    
    return NextResponse.json(item)
  } catch (error) {
    console.error("Team Create Error:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}



