"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import ResourceModal from "@/components/resource-modal"

type Client = {
  id: string
  name: string
  logoUrl: string
}

export default function ClientsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Client | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const columns: { key: keyof Client; label: string; render?: (item: Client) => React.ReactNode }[] = [
    { 
      key: "logoUrl", 
      label: "Logo",
      render: (item) => (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center p-2">
          <img src={item.logoUrl} alt={item.name} className="max-w-full max-h-full object-contain" />
        </div>
      )
    },
    { key: "name", label: "Client Name" },
  ]

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return
    try {
      await fetch(`/api/clients/${id}`, { method: "DELETE" })
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      alert("Failed to delete")
    }
  }

  const handleSave = async (data: any) => {
    const method = editingItem ? "PATCH" : "POST"
    const url = editingItem ? `/api/clients/${editingItem.id}` : "/api/clients"

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
      <DataTable<Client>
        key={refreshKey}
        title="Clients"
        resource="clients"
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
        title={editingItem ? "Edit Client" : "Add New Client"}
        onSave={handleSave}
        initialData={editingItem}
        fields={[
          { name: "name", label: "Client Name", type: "text", placeholder: "Tech Corp" },
          { name: "logoUrl", label: "Client Logo", type: "media", folder: "clients" },
        ]}
      />
    </div>
  )
}
