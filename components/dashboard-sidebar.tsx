"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Building2,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

const menuItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Team Members", href: "/dashboard/team", icon: Users },
  { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
  { label: "Clients", href: "/dashboard/clients", icon: Building2 },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen transition-all duration-300">
      <div className="p-8 flex items-center gap-3">
        <img src="/nav_logo.png" alt="Logo" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold transition-all",
                isActive 
                  ? "bg-[#c42b47]/5 text-[#c42b47]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-[15px] font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}
