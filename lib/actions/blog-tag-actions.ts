"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const TagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
})

export async function createTag(data: z.infer<typeof TagSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const parsedData = TagSchema.parse(data)

    const existing = await prisma.blogTag.findUnique({
      where: { slug: parsedData.slug },
    })

    if (existing) {
      return { error: "Tag with this slug already exists" }
    }

    const tag = await prisma.blogTag.create({
      data: parsedData,
    })

    revalidatePath("/dashboard/blog/tags")
    return { success: "Tag created successfully", tag }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Failed to create tag:", error)
    return { error: "Failed to create tag" }
  }
}

export async function updateTag(id: string, data: z.infer<typeof TagSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const parsedData = TagSchema.parse(data)

    const existing = await prisma.blogTag.findUnique({
      where: { slug: parsedData.slug },
    })

    if (existing && existing.id !== id) {
      return { error: "Tag with this slug already exists" }
    }

    const tag = await prisma.blogTag.update({
      where: { id },
      data: parsedData,
    })

    revalidatePath("/dashboard/blog/tags")
    return { success: "Tag updated successfully", tag }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Failed to update tag:", error)
    return { error: "Failed to update tag" }
  }
}

export async function deleteTag(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    await prisma.blogTag.delete({
      where: { id },
    })

    revalidatePath("/dashboard/blog/tags")
    return { success: "Tag deleted successfully" }
  } catch (error) {
    console.error("Failed to delete tag:", error)
    return { error: "Failed to delete tag" }
  }
}

export async function getTags() {
  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })
    return { tags }
  } catch (error) {
    console.error("Failed to fetch tags:", error)
    return { error: "Failed to fetch tags" }
  }
}
