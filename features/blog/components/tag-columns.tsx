"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BlogTag } from "@/app/generated/prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { deleteTag } from "@/lib/actions/blog-tag-actions"
import { useRouter } from "next/navigation"

export const tagColumns: ColumnDef<BlogTag>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tag = row.original
      const router = useRouter()

      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this tag?")) {
          await deleteTag(tag.id)
          router.refresh()
        }
      }

      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/blog/tags/${tag.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )
    },
  },
]
