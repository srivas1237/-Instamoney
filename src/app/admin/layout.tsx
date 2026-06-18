'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BarChart3, Users, Settings, LogOut, Shield } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-lg min-h-screen">
            <div className="p-4 border-b">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/instamoney-logo.png" 
                  alt="InstaMoney Logo" 
                  className="h-10"
                />
              </Link>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                </li>
                {ROLE_PERMISSIONS[user.role].includes('view_leads') && (
                  <li>
                    <Link 
                      href="/admin/leads" 
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
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
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
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
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <Shield className="h-5 w-5" />
                      Users
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <div className="absolute bottom-0 w-64 p-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{user.role}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
