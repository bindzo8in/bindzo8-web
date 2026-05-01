"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import ResourceModal from "@/components/resource-modal"

type Project = {
  id: string
  title: string
  description: string
  category: string
  tag: string
  mediaUrl: string
  mediaType: "image" | "video"
}

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Project | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const columns: { key: keyof Project; label: string; render?: (item: Project) => React.ReactNode }[] = [
    { 
      key: "mediaUrl", 
      label: "Media",
      render: (item) => (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
          {item.mediaType === "image" ? (
            <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[10px] font-bold">VIDEO</div>
          )}
        </div>
      )
    },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "tag", label: "Tag" },
  ]

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      alert("Failed to delete")
    }
  }

  const handleSave = async (data: any) => {
    const method = editingItem ? "PATCH" : "POST"
    const url = editingItem ? `/api/projects/${editingItem.id}` : "/api/projects"

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
      <DataTable<Project>
        key={refreshKey}
        title="Projects"
        resource="projects"
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
        title={editingItem ? "Edit Project" : "Add New Project"}
        onSave={handleSave}
        initialData={editingItem}
        fields={[
          { name: "title", label: "Project Title", type: "text", placeholder: "E-commerce Website" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Short description of the project" },
          { name: "category", label: "Category", type: "text", placeholder: "Web Development" },
          { name: "tag", label: "Tag", type: "text", placeholder: "Next.js" },
          { name: "mediaType", label: "Media Type", type: "select", options: ["image", "video"] },
          { name: "mediaUrl", label: "Media Upload", type: "media", folder: "projects" },
        ]}
      />
    </div>
  )
}
