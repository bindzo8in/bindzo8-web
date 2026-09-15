import { prisma } from "@/lib/prisma"
import { PostForm } from "@/features/blog/components/post-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Admin | Edit Post",
}

export default async function AdminEditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: {
      tags: true,
    }
  })

  if (!post) {
    notFound()
  }

  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  })
  
  const tags = await prisma.blogTag.findMany({
    orderBy: { name: "asc" },
  })

  // Format initial data to match form schema
  const initialData = {
    ...post,
    tagIds: post.tags.map(tag => tag.id)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>
      <PostForm initialData={initialData} categories={categories} tags={tags} />
    </div>
  )
}
