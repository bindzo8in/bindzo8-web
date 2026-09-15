"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { deletePost } from "@/lib/actions/blog-post-actions"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export const postColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === "PUBLISHED" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const post = row.original
      const router = useRouter()

      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this post?")) {
          await deletePost(post.id)
          router.refresh()
        }
      }

      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/blog/posts/${post.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )
    },
  },
]
