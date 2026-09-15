"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional().nullable(),
})

export async function createCategory(data: z.infer<typeof CategorySchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const parsedData = CategorySchema.parse(data)

    const existing = await prisma.blogCategory.findUnique({
      where: { slug: parsedData.slug },
    })

    if (existing) {
      return { error: "Category with this slug already exists" }
    }

    const category = await prisma.blogCategory.create({
      data: parsedData,
    })

    revalidatePath("/dashboard/blog/categories")
    return { success: "Category created successfully", category }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Failed to create category:", error)
    return { error: "Failed to create category" }
  }
}

export async function updateCategory(id: string, data: z.infer<typeof CategorySchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const parsedData = CategorySchema.parse(data)

    const existing = await prisma.blogCategory.findUnique({
      where: { slug: parsedData.slug },
    })

    if (existing && existing.id !== id) {
      return { error: "Category with this slug already exists" }
    }

    const category = await prisma.blogCategory.update({
      where: { id },
      data: parsedData,
    })

    revalidatePath("/dashboard/blog/categories")
    return { success: "Category updated successfully", category }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Failed to update category:", error)
    return { error: "Failed to update category" }
  }
}

export async function deleteCategory(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Check if category is used by any posts
    const category = await prisma.blogCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })

    if (category?._count.posts && category._count.posts > 0) {
      return { error: "Cannot delete category with associated posts" }
    }

    await prisma.blogCategory.delete({
      where: { id },
    })

    revalidatePath("/dashboard/blog/categories")
    return { success: "Category deleted successfully" }
  } catch (error) {
    console.error("Failed to delete category:", error)
    return { error: "Failed to delete category" }
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })
    return { categories }
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return { error: "Failed to fetch categories" }
  }
}
