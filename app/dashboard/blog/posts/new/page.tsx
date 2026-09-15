import { prisma } from "@/lib/prisma"
import { PostForm } from "@/features/blog/components/post-form"

export const metadata = {
  title: "Admin | Create Post",
}

export default async function AdminCreatePostPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  })
  
  const tags = await prisma.blogTag.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>
      <PostForm categories={categories} tags={tags} />
    </div>
  )
}
