import { prisma } from "@/lib/prisma"
import { DataTable } from "@/features/blog/components/data-table"
import { categoryColumns } from "@/features/blog/components/category-columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Admin | Blog Categories",
}

export default async function AdminCategoriesPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Categories</h1>
        <Button asChild>
          <Link href="/dashboard/blog/categories/new">Create Category</Link>
        </Button>
      </div>
      <DataTable columns={categoryColumns} data={categories} />
    </div>
  )
}
