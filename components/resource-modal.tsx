"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import MediaUpload from "./media-upload"

interface Field {
  name: string
  label: string
  type: "text" | "date" | "select" | "textarea" | "media"
  placeholder?: string
  options?: string[]
  folder?: string // For media upload
}

interface ResourceModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onSave: (data: any) => void
  initialData?: any
  fields: Field[]
}

export default function ResourceModal({
  isOpen,
  onClose,
  title,
  onSave,
  initialData,
  fields,
}: ResourceModalProps) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (initialData) {
      const formattedData = { ...initialData }
      fields.forEach(f => {
        if (f.type === "date" && initialData[f.name]) {
          formattedData[f.name] = new Date(initialData[f.name]).toISOString().split('T')[0]
        }
      })
      setFormData(formattedData)
    } else {
      setFormData({})
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 font-kumbh">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            onSave(formData)
          }}
          className="p-10 space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto px-1">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                  {field.label}
                </label>
                {field.type === "media" ? (
                  <MediaUpload
                    value={formData[field.name]}
                    folder={field.folder || "general"}
                    resourceType={formData.mediaType || "image"}
                    onChange={(url, publicId) => {
                      // We need to handle both URL and public ID
                      // For simplicity, we assume the publicId field name matches or is logoPublicId
                      const publicIdKey = field.name === "logoUrl" ? "logoPublicId" : "mediaPublicId"
                      setFormData({ 
                        ...formData, 
                        [field.name]: url, 
                        [publicIdKey]: publicId 
                      })
                    }}
                    onClear={() => {
                      const publicIdKey = field.name === "logoUrl" ? "logoPublicId" : "mediaPublicId"
                      setFormData({ 
                        ...formData, 
                        [field.name]: "", 
                        [publicIdKey]: "" 
                      })
                    }}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#c42b47] focus:ring-4 focus:ring-[#c42b47]/5 transition-all px-6 outline-none appearance-none"
                    required
                  >
                    <option value="" disabled>Select {field.label}</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#c42b47] focus:ring-4 focus:ring-[#c42b47]/5 transition-all p-6 outline-none min-h-[120px]"
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#c42b47] focus:ring-4 focus:ring-[#c42b47]/5 transition-all px-6 outline-none"
                    required
                  />
                )}
              </div>
            ))}
          </div>


          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-14 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#c42b47] text-white h-14 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#c42b47]/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
