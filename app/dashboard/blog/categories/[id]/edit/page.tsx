import { prisma } from "@/lib/prisma"
import { CategoryForm } from "@/features/blog/components/category-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Admin | Edit Category",
}

export default async function AdminEditCategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.blogCategory.findUnique({
    where: { id: params.id },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>
      <CategoryForm initialData={category} />
    </div>
  )
}
