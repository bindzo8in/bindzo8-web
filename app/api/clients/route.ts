import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get("cursor")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""

  try {
    const items = await prisma.client.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
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
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const item = await prisma.client.create({
      data: {
        name: body.name,
        logoUrl: body.logoUrl,
        logoPublicId: body.logoPublicId,
      },
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}


