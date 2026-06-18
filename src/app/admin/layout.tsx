'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BarChart3, Users, Settings, LogOut, Shield, Menu, X, FileText, UserPlus } from 'lucide-react'
import { getCurrentAdminUser, setCurrentAdminUser, InstaAdminUser } from '@/lib/storage'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<InstaAdminUser | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const loggedInUser = getCurrentAdminUser()
    if (loggedInUser && pathname !== '/admin/login') {
      setUser(loggedInUser)
    } else if (!loggedInUser && pathname !== '/admin/login') {
      router.push('/admin/login')
    } else if (loggedInUser && pathname === '/admin/login') {
      router.push('/admin')
    }
  }, [pathname, router])

  const handleLogout = () => {
    setCurrentAdminUser(null)
    setUser(null)
    router.push('/admin/login')
  }

  if (!user && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === '/admin'
                ? 'bg-[#0052ff] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>

          {user?.permissions.includes('view_leads') && (
            <Link
              href="/admin/leads"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/leads'
                  ? 'bg-[#0052ff] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users className="h-5 w-5" />
              Leads
            </Link>
          )}

          {(user?.role === 'super_admin' || user?.role === 'admin') && (
            <Link
              href="/admin/cases"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/cases'
                  ? 'bg-[#0052ff] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FileText className="h-5 w-5" />
              Cases & Compliance
            </Link>
          )}

          {user?.role === 'agent' && (
            <Link
              href="/admin/my-cases"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/my-cases'
                  ? 'bg-[#0052ff] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FileText className="h-5 w-5" />
              My Cases
            </Link>
          )}

          {user?.permissions.includes('view_reports') && (
            <Link
              href="/admin/reports"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/reports'
                  ? 'bg-[#0052ff] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <BarChart3 className="h-5 w-5" />
              Reports
            </Link>
          )}

          {user?.permissions.includes('manage_users') && (
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/users'
                  ? 'bg-[#0052ff] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Shield className="h-5 w-5" />
              Users
            </Link>
          )}

          <Link
            href="/admin/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === '/admin/profile'
                ? 'bg-[#0052ff] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Settings className="h-5 w-5" />
            Profile
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-[#0052ff] rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between flex-shrink-0">
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
