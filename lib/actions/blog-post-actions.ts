"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().nullable().optional(),
  featuredImagePublicId: z.string().nullable().optional(),
  featuredImageAlt: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  readingTime: z.number().int().nullable().optional(),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  publishedAt: z.date().nullable().optional(),
  categoryId: z.string().min(1, "Category is required"),
  tagIds: z.array(z.string()).default([]),
})

export async function createPost(data: z.infer<typeof PostSchema>) {
  try {
    const session = await auth()
    let userId = session?.user?.id
    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
      if (dbUser) userId = dbUser.id
    }

    if (!userId) {
      return { error: "Unauthorized" }
    }

    const parsedData = PostSchema.parse(data)
    const { tagIds, categoryId, ...postData } = parsedData

    const existing = await prisma.blogPost.findUnique({
      where: { slug: postData.slug },
    })

    if (existing) {
      return { error: "Post with this slug already exists" }
    }

    const post = await prisma.blogPost.create({
      data: {
        ...postData,
        author: {
          connect: { id: userId }
        },
        category: {
          connect: { id: categoryId }
        },
        tags: {
          connect: tagIds.map(tagId => ({ id: tagId }))
        }
      },
    })

    revalidatePath("/dashboard/blog/posts")
    revalidatePath("/blog")
    return { success: "Post created successfully", post }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Failed to create post:", error)
    return { error: "Failed to create post" }
  }
}

export async function updatePost(id: string, data: z.infer<typeof PostSchema>) {
  try {
    const session = await auth()
    let userId = session?.user?.id
    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } })
      if (dbUser) userId = dbUser.id
    }

    if (!userId) {
      return { error: "Unauthorized" }
    }

    const parsedData = PostSchema.parse(data)
    const { tagIds, categoryId, ...postData } = parsedData

    const existing = await prisma.blogPost.findUnique({
      where: { slug: postData.slug },
    })

    if (existing && existing.id !== id) {
      return { error: "Post with this slug already exists" }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...postData,
        category: {
          connect: { id: categoryId }
        },
        tags: {
          set: tagIds.map(tagId => ({ id: tagId }))
        }
      },
    })

    revalidatePath("/dashboard/blog/posts")
    revalidatePath("/blog")
    revalidatePath(`/blog/${post.slug}`)
    return { success: "Post updated successfully", post }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Failed to update post:", error)
    return { error: "Failed to update post" }
  }
}

export async function deletePost(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    await prisma.blogPost.delete({
      where: { id },
    })

    revalidatePath("/dashboard/blog/posts")
    revalidatePath("/blog")
    return { success: "Post deleted successfully" }
  } catch (error) {
    console.error("Failed to delete post:", error)
    return { error: "Failed to delete post" }
  }
}
