import { prisma } from "@/lib/prisma"
import { DataTable } from "@/features/blog/components/data-table"
import { postColumns } from "@/features/blog/components/post-columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Admin | Blog Posts",
}

export default async function AdminPostsPage() {
  const posts = await prisma.blogPost.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/dashboard/blog/posts/new">Create Post</Link>
        </Button>
      </div>
      <DataTable columns={postColumns} data={posts} />
    </div>
  )
}
