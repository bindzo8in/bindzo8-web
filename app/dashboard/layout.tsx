import { auth } from "@/auth"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if(!session || !session.user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-kumbh">
      <DashboardSidebar />
      <main className="flex-1 p-8 pt-24 md:p-12 md:pt-24 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
