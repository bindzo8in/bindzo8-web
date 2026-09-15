import { prisma } from "@/lib/prisma"
import { TagForm } from "@/features/blog/components/tag-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Admin | Edit Tag",
}

export default async function AdminEditTagPage({ params }: { params: { id: string } }) {
  const tag = await prisma.blogTag.findUnique({
    where: { id: params.id },
  })

  if (!tag) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Tag</h1>
      </div>
      <TagForm initialData={tag} />
    </div>
  )
}
