"use client"

import { useState } from "react"
import { Upload, X, Loader2, Image as ImageIcon, Film } from "lucide-react"

interface MediaUploadProps {
  value?: string
  onChange: (url: string, publicId: string) => void
  onClear: () => void
  folder: string
  resourceType: "image" | "video"
}

export default function MediaUpload({
  value,
  onChange,
  onClear,
  folder,
  resourceType,
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)
    formData.append("resourceType", resourceType)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        onChange(data.url, data.publicId)
      } else {
        alert(data.error || "Upload failed")
      }
    } catch (error) {
      alert("An error occurred during upload")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 group border border-gray-100">
          {resourceType === "image" ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <video src={value} className="w-full h-full object-cover" controls />
          )}
          <button
            type="button"
            onClick={onClear}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-[2.5rem] border-4 border-dashed border-gray-100 bg-gray-50 hover:bg-white hover:border-[#E7325C]/20 transition-all cursor-pointer group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-12 h-12 text-[#E7325C] animate-spin" />
            ) : (
              <>
                <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {resourceType === "image" ? (
                    <ImageIcon className="text-[#E7325C]" size={32} />
                  ) : (
                    <Film className="text-[#E7325C]" size={32} />
                  )}
                </div>
                <p className="mb-2 text-sm text-gray-700 font-bold uppercase tracking-widest">
                  Click to upload {resourceType}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  PNG, JPG, MP4 or MOV (max. 10MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={resourceType === "image" ? "image/*" : "video/*"}
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  )
}
