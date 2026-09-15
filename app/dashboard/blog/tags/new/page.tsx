import { TagForm } from "@/features/blog/components/tag-form"

export const metadata = {
  title: "Admin | Create Tag",
}

export default function AdminCreateTagPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Tag</h1>
      </div>
      <TagForm />
    </div>
  )
}
