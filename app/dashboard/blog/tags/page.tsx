import { prisma } from "@/lib/prisma"
import { DataTable } from "@/features/blog/components/data-table"
import { tagColumns } from "@/features/blog/components/tag-columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Admin | Blog Tags",
}

export default async function AdminTagsPage() {
  const tags = await prisma.blogTag.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Tags</h1>
        <Button asChild>
          <Link href="/dashboard/blog/tags/new">Create Tag</Link>
        </Button>
      </div>
      <DataTable columns={tagColumns} data={tags} />
    </div>
  )
}
