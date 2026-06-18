'use client'

import { useState, useEffect } from 'react'
import { Plus, FileText, User, Calendar, ArrowRight } from 'lucide-react'
import { createCase, getAdminUsers, getCases, getCurrentAdminUser, InstaCase, InstaAdminUser } from '@/lib/storage'

const getId = (value: any): string => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return (value.id || value._id || '').toString()
  return ''
}

const normalizeCases = (data: any): InstaCase[] => {
  if (!Array.isArray(data)) return []
  return data.map((c: any) => ({
    ...c,
    id: getId(c?.id || c?._id || c?.id),
    assignedTo: c?.assignedTo,
    assignedBy: c?.assignedBy,
    createdAt: c?.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: c?.updatedAt ? new Date(c.updatedAt).toISOString() : new Date().toISOString(),
  }))
}

const normalizeAdminUsers = (data: any): InstaAdminUser[] => {
  if (!Array.isArray(data)) return []
  return data.map((u: any) => ({
    ...u,
    id: getId(u?.id || u?._id || u?.id),
    permissions: Array.isArray(u?.permissions) ? u.permissions : [],
  }))
}

export default function CasesPage() {
  const [cases, setCasesState] = useState<InstaCase[]>([])
  const [users, setUsers] = useState<InstaAdminUser[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<InstaAdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<InstaCase>>({
    title: '',
    description: '',
    type: 'case',
    status: 'open',
    assignedTo: '',
  })

  useEffect(() => {
    setCurrentUser(getCurrentAdminUser())
    ;(async () => {
      try {
        const [casesData, usersData] = await Promise.all([getCases(), getAdminUsers()])
        setCasesState(normalizeCases(casesData))
        const normalizedUsers = normalizeAdminUsers(usersData).filter(
          (u) => u.role === 'agent' || u.role === 'admin'
        )
        setUsers(normalizedUsers)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    try {
      await createCase({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        status: 'open',
        assignedTo: formData.assignedTo,
      })
      const casesData = await getCases()
      setCasesState(normalizeCases(casesData))
      setIsModalOpen(false)
    } catch {
      return
    }
    setFormData({
      title: '',
      description: '',
      type: 'case',
      status: 'open',
      assignedTo: '',
    })
  }

  const getAssignedUserName = (assignedTo: any) => {
    if (assignedTo && typeof assignedTo === 'object' && assignedTo.name) return assignedTo.name as string
    const id = getId(assignedTo)
    return users.find((u) => u.id === id)?.name || ''
  }

  const getAssignedUserInitial = (assignedTo: any) => {
    const name = getAssignedUserName(assignedTo)
    return name ? name.charAt(0) : ''
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cases & Compliance</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0052ff] text-white rounded-lg hover:bg-[#003ecf] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Assign New Case
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-500 text-sm">Open Cases</h3>
          <p className="text-2xl font-bold text-gray-900">
            {cases.filter(c => c.status === 'open').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-500 text-sm">In Progress</h3>
          <p className="text-2xl font-bold text-gray-900">
            {cases.filter(c => c.status === 'in_progress').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-500 text-sm">Resolved</h3>
          <p className="text-2xl font-bold text-gray-900">
            {cases.filter(c => c.status === 'resolved' || c.status === 'closed').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading && (
          <div className="p-6 text-sm text-gray-500">Loading cases...</div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No cases found
                  </td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-[#0052ff]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{c.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.type === 'compliance' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {c.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getAssignedUserName(c.assignedTo) && (
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-[#0052ff] rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {getAssignedUserInitial(c.assignedTo)}
                          </div>
                          <span className="text-gray-900">{getAssignedUserName(c.assignedTo)}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                        c.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        c.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {c.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Assign New Case</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight className="h-6 w-6 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'compliance' | 'case' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  >
                    <option value="case">Case</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                  <select
                    required
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  >
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#0052ff] text-white rounded-lg hover:bg-[#003ecf]"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
