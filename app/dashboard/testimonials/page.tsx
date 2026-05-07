"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import ResourceModal from "@/components/resource-modal"

type Testimonial = {
  id: string
  content: string
  author: string
}

import { toast } from "sonner"

export default function TestimonialsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const columns: { key: keyof Testimonial; label: string; render?: (item: Testimonial) => React.ReactNode }[] = [
    { 
      key: "content", 
      label: "Content",
      render: (item) => (
        <div className="max-w-md truncate text-gray-500 italic">"{item.content}"</div>
      )
    },
    { key: "author", label: "Author" },
  ]

  const handleDelete = async (id: string) => {
    toast.info("Are you sure you want to delete this testimonial?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
            if (res.ok) {
              toast.success("Testimonial deleted successfully")
              setRefreshKey(prev => prev + 1)
            } else {
              toast.error("Failed to delete testimonial")
            }
          } catch (error) {
            toast.error("An error occurred while deleting")
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    })
  }

  const handleSave = async (data: any) => {
    const method = editingItem ? "PATCH" : "POST"
    const url = editingItem ? `/api/testimonials/${editingItem.id}` : "/api/testimonials"

    const promise = fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(async (res) => {
      if (!res.ok) throw new Error("Failed to save")
      setModalOpen(false)
      setRefreshKey(prev => prev + 1)
      return res
    })

    toast.promise(promise, {
      loading: editingItem ? "Updating testimonial..." : "Adding testimonial...",
      success: editingItem ? "Testimonial updated successfully" : "Testimonial added successfully",
      error: (err) => err.message || "An error occurred while saving",
    })
  }

  return (
    <div>
      <DataTable<Testimonial>
        key={refreshKey}
        title="Testimonials"
        resource="testimonials"
        columns={columns}
        onCreate={() => {
          setEditingItem(null)
          setModalOpen(true)
        }}
        onEdit={(item) => {
          setEditingItem(item)
          setModalOpen(true)
        }}
        onDelete={handleDelete}
      />

      <ResourceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? "Edit Testimonial" : "Add New Testimonial"}
        onSave={handleSave}
        initialData={editingItem}
        fields={[
          { name: "author", label: "Author Name", type: "text", placeholder: "Jane Smith" },
          { name: "content", label: "Testimonial Content", type: "textarea", placeholder: "The service was amazing..." },
        ]}
      />
    </div>
  )
}
