"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import ResourceModal from "@/components/resource-modal"

type Testimonial = {
  id: string
  content: string
  author: string
}

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
    if (!confirm("Are you sure you want to delete this testimonial?")) return
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      alert("Failed to delete")
    }
  }

  const handleSave = async (data: any) => {
    const method = editingItem ? "PATCH" : "POST"
    const url = editingItem ? `/api/testimonials/${editingItem.id}` : "/api/testimonials"

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      if (res.ok) {
        setModalOpen(false)
        setRefreshKey(prev => prev + 1)
      } else {
        alert("Failed to save")
      }
    } catch (error) {
      alert("An error occurred")
    }
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
