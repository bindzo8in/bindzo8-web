"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import ResourceModal from "@/components/resource-modal"

type TeamMember = {
  id: string
  name: string
  position: string
  dateOfJoining: string
  mediaUrl: string
  mediaType: "image" | "video"
}

export default function TeamPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const columns: { key: keyof TeamMember; label: string; render?: (item: TeamMember) => React.ReactNode }[] = [
    { 
      key: "mediaUrl", 
      label: "Media",
      render: (item) => (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
          {item.mediaType === "image" ? (
            <img src={item.mediaUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[10px] font-bold">VIDEO</div>
          )}
        </div>
      )
    },
    { key: "name", label: "Name" },
    { key: "position", label: "Position" },
    { 
      key: "dateOfJoining", 
      label: "Joined",
      render: (item) => new Date(item.dateOfJoining).toLocaleDateString()
    },
  ]

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return
    try {
      await fetch(`/api/team/${id}`, { method: "DELETE" })
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      alert("Failed to delete")
    }
  }

  const handleSave = async (data: any) => {
    const method = editingItem ? "PATCH" : "POST"
    const url = editingItem ? `/api/team/${editingItem.id}` : "/api/team"

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      console.log(res)
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
      <DataTable<TeamMember>
        key={refreshKey}
        title="Team Members"
        resource="team"
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
        title={editingItem ? "Edit Member" : "Add New Member"}
        onSave={handleSave}
        initialData={editingItem}
        fields={[
          { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
          { name: "position", label: "Position", type: "text", placeholder: "Senior Designer" },
          { name: "dateOfJoining", label: "Date of Joining", type: "date" },
          { name: "mediaType", label: "Media Type", type: "select", options: ["image", "video"] },
          { name: "mediaUrl", label: "Media Upload", type: "media", folder: "team" },
        ]}
      />
    </div>
  )
}
