"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        toast.error("Invalid credentials", {
          description: "Please check your email and password.",
        })
      } else {
        toast.success("Login successful!", {
          description: "Redirecting to dashboard...",
        })
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-14 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#E7325C] focus:ring-[#E7325C]/20 transition-all px-6 outline-none"
          placeholder="admin@bindzo8.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-14 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:border-[#E7325C] focus:ring-[#E7325C]/20 transition-all px-6 outline-none"
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#E7325C] to-[#c42b47] hover:from-[#c42b47] hover:to-[#d3325c] text-white h-14 text-lg font-bold rounded-2xl shadow-xl shadow-[#d3325c]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
      >
        {loading ? "Signing in..." : "Login to Dashboard"}
      </button>
    </form>
  )
}
