import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F4] flex items-center justify-center p-6 pt-24 font-kumbh">
      <div className="w-full max-w-[450px]">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-white/20">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-500">Access the BINDZO 8 Dashboard</p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
