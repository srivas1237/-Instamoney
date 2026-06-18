'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, IdCard, Award } from 'lucide-react'
import { getCurrentAdminUser, getAdminUsers, setAdminUsers, setCurrentAdminUser, InstaAdminUser } from '@/lib/storage'

export default function AdminProfilePage() {
  const [user, setUser] = useState<InstaAdminUser | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<InstaAdminUser>>({})

  useEffect(() => {
    const currentUser = getCurrentAdminUser()
    if (currentUser) {
      setUser(currentUser)
      setFormData(currentUser)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if (!user) return
    const users = getAdminUsers()
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...formData } as InstaAdminUser : u)
    setAdminUsers(updatedUsers)
    const updatedUser = updatedUsers.find(u => u.id === user.id) as InstaAdminUser
    setUser(updatedUser)
    setCurrentAdminUser(updatedUser)
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 bg-[#0052ff] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.role.replace('_', ' ').toUpperCase()}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto px-4 py-2 bg-[#0052ff] text-white rounded-lg hover:bg-[#003ecf] transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{user.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <IdCard className="h-4 w-4" />
                  Employee ID
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{user.employeeId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Band
                </label>
                {isEditing ? (
                  <select
                    name="band"
                    value={formData.band}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                ) : (
                  <p className="text-gray-900">Band {user.band}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <p className="text-gray-900">{user.username}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="flex flex-wrap gap-1">
                  {user.permissions.map(perm => (
                    <span key={perm} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {perm.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6">
              <button
                onClick={handleSave}
                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
