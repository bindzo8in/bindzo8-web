"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  MoreVertical,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface DataTableProps<T> {
  title: string
  resource: string
  columns: {
    key: keyof T
    label: string
    render?: (item: T) => React.ReactNode
  }[]
  onEdit: (item: T) => void
  onDelete: (id: string) => void
  onCreate: () => void
}

export default function DataTable<T extends { id: string }>({
  title,
  resource,
  columns,
  onEdit,
  onDelete,
  onCreate,
}: DataTableProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [cursors, setCursors] = useState<string[]>([])
  const [openActionId, setOpenActionId] = useState<string | null>(null)

  const fetchItems = async (cursor?: string) => {
    setLoading(true)

    try {
      const url = new URL(`/api/${resource}`, window.location.origin)

      url.searchParams.set("limit", "10")
      url.searchParams.set("search", search)

      if (cursor) {
        url.searchParams.set("cursor", cursor)
      }

      const res = await fetch(url.toString())
      const data = await res.json()

      if (res.ok) {
        setItems(data.items || [])
        setNextCursor(data.nextCursor)
      } else {
        console.error("API error:", data.error)
        setItems([])
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    setCursors([])
    setOpenActionId(null)
  }, [search])

  const handleNext = () => {
    if (!nextCursor) return

    setCursors((prev) => [...prev, items[0]?.id].filter(Boolean))
    setOpenActionId(null)
    fetchItems(nextCursor)
  }

  const handlePrevious = () => {
    fetchItems()
    setCursors([])
    setOpenActionId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-2xl border border-gray-100 bg-white pl-12 pr-4 outline-none transition-all focus:border-[#c42b47] focus:ring-4 focus:ring-[#c42b47]/5 sm:w-64"
            />
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#c42b47] px-6 font-bold text-white shadow-lg shadow-[#c42b47]/20 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm md:rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50/50">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-4 py-5 text-[13px] font-bold uppercase tracking-widest text-gray-400 md:px-8"
                  >
                    {col.label}
                  </th>
                ))}

                <th className="px-4 py-5 text-right text-[13px] font-bold uppercase tracking-widest text-gray-400 md:px-8">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((col) => (
                      <td key={String(col.key)} className="px-4 py-6 md:px-8">
                        <div className="h-4 w-24 rounded bg-gray-100" />
                      </td>
                    ))}

                    <td className="px-4 py-6 text-right md:px-8">
                      <div className="ml-auto h-4 w-8 rounded bg-gray-100" />
                    </td>
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-8 py-12 text-center font-medium text-gray-500"
                  >
                    No items found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition-colors hover:bg-gray-50/50"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-4 py-5 font-medium text-gray-700 md:px-8 md:py-6"
                      >
                        {col.render
                          ? col.render(item)
                          : (item[col.key] as React.ReactNode)}
                      </td>
                    ))}

                   <td className="relative px-4 py-5 text-right md:px-8 md:py-6">
  {/* Desktop actions: only show while row hover */}
  <div className="hidden items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
    <button
      type="button"
      onClick={() => onEdit(item)}
      className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-blue-500"
      aria-label="Edit item"
    >
      <Edit2 size={18} />
    </button>

    <button
      type="button"
      onClick={() => onDelete(item.id)}
      className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-red-500"
      aria-label="Delete item"
    >
      <Trash2 size={18} />
    </button>
  </div>

  {/* Mobile action trigger: always visible */}
  <div className="flex justify-end md:hidden">
    <button
      type="button"
      onClick={() =>
        setOpenActionId(openActionId === item.id ? null : item.id)
      }
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-500 shadow-sm transition-all active:scale-95"
      aria-label="Open actions"
    >
      <MoreVertical size={20} />
    </button>

    {openActionId === item.id && (
      <>
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/5"
          onClick={() => setOpenActionId(null)}
          aria-label="Close actions"
        />

        <div className="absolute right-4 top-14 z-40 w-40 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <button
            type="button"
            onClick={() => {
              setOpenActionId(null)
              onEdit(item)
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 active:bg-gray-50"
          >
            <Edit2 size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenActionId(null)
              onDelete(item.id)
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 active:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </>
    )}
  </div>
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 bg-gray-50/30 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-sm font-medium text-gray-400">
            Showing {items.length} items
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={cursors.length === 0}
              className="rounded-xl border border-gray-100 p-2 transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-30"
              onClick={handlePrevious}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              disabled={!nextCursor}
              className="rounded-xl border border-gray-100 p-2 transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-30"
              onClick={handleNext}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}