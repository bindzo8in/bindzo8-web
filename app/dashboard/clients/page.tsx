"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import ResourceModal from "@/components/resource-modal"

type Client = {
  id: string
  name: string
  logoUrl: string
}

import { toast } from "sonner"

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
    toast.info("Are you sure you want to delete this client?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(`/api/clients/${id}`, { method: "DELETE" })
            if (res.ok) {
              toast.success("Client deleted successfully")
              setRefreshKey(prev => prev + 1)
            } else {
              toast.error("Failed to delete client")
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
    const url = editingItem ? `/api/clients/${editingItem.id}` : "/api/clients"

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
      loading: editingItem ? "Updating client..." : "Creating client...",
      success: editingItem ? "Client updated successfully" : "Client created successfully",
      error: (err) => err.message || "An error occurred while saving",
    })
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
