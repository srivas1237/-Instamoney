'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BarChart3, Users, Settings, LogOut, Shield, Menu, X } from 'lucide-react'

// Roles and permissions
export type Role = 'super_admin' | 'admin' | 'agent'
export type Permission = 'view_leads' | 'edit_leads' | 'delete_leads' | 'manage_users' | 'view_reports'

export interface User {
  id: string
  username: string
  role: Role
  name: string
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
  admin: ['view_leads', 'edit_leads', 'view_reports'],
  agent: ['view_leads']
}

export const USERS: User[] = [
  { id: '1', username: 'superadmin', role: 'super_admin', name: 'Super Admin' },
  { id: '2', username: 'admin', role: 'admin', name: 'Admin' },
  { id: '3', username: 'agent', role: 'agent', name: 'Agent' }
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('admin_user')
    if (loggedInUser && pathname !== '/admin/login') {
      setUser(JSON.parse(loggedInUser))
    } else if (!loggedInUser && pathname !== '/admin/login') {
      router.push('/admin/login')
    } else if (loggedInUser && pathname === '/admin/login') {
      router.push('/admin')
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    setUser(null)
    router.push('/admin/login')
  }

  if (!user && pathname !== '/admin/login') {
    return null // Loading or redirecting
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
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
            <ul className="space-y-2">
              <li>
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
              </li>
              {ROLE_PERMISSIONS[user.role].includes('view_leads') && (
                <li>
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
                </li>
              )}
              {ROLE_PERMISSIONS[user.role].includes('view_reports') && (
                <li>
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
                </li>
              )}
              {ROLE_PERMISSIONS[user.role].includes('manage_users') && (
                <li>
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
                </li>
              )}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{user.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{user.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-lg text-gray-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between flex-shrink-0">
            <button
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </header>

          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
