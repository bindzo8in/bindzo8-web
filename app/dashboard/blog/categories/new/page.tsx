import { CategoryForm } from "@/features/blog/components/category-form"

export const metadata = {
  title: "Admin | Create Category",
}

export default function AdminCreateCategoryPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Category</h1>
      </div>
      <CategoryForm />
    </div>
  )
}
