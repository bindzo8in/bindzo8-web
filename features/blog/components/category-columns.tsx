"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BlogCategory } from "@/app/generated/prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { deleteCategory } from "@/lib/actions/blog-category-actions"
import { useRouter } from "next/navigation"

export const categoryColumns: ColumnDef<BlogCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original
      const router = useRouter()

      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this category?")) {
          await deleteCategory(category.id)
          router.refresh()
        }
      }

      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/blog/categories/${category.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )
    },
  },
]
