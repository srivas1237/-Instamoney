'use client'

import { useState, useEffect } from 'react'
import { FileText, User, Calendar, Check, ArrowRight } from 'lucide-react'
import { getCases, setCases, getCurrentAdminUser, getAdminUsers, Case, AdminUser } from '@/lib/storage'

export default function MyCasesPage() {
  const [cases, setCasesState] = useState<Case[]>([])
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resolution, setResolution] = useState('')

  useEffect(() => {
    const user = getCurrentAdminUser()
    if (user) {
      setCurrentUser(user)
      setCasesState(getCases().filter(c => c.assignedTo === user.id))
    }
  }, [])

  const handleUpdateStatus = (caseId: string, status: Case['status']) => {
    const updatedCases = getCases().map(c => 
      c.id === caseId ? { ...c, status, updatedAt: new Date().toISOString() } : c
    )
    setCases(updatedCases)
    setCasesState(updatedCases.filter(c => c.assignedTo === currentUser?.id))
  }

  const handleAddResolution = () => {
    if (!selectedCase) return
    const updatedCases = getCases().map(c => 
      c.id === selectedCase.id ? { 
        ...c, 
        resolution, 
        status: 'resolved', 
        updatedAt: new Date().toISOString() 
      } : c
    )
    setCases(updatedCases)
    setCasesState(updatedCases.filter(c => c.assignedTo === currentUser?.id))
    setIsModalOpen(false)
    setResolution('')
    setSelectedCase(null)
  }

  const getAssignedByUser = (id: string) => getAdminUsers().find(u => u.id === id)

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Cases</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-500 text-sm">Pending</h3>
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

      <div className="space-y-4">
        {cases.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No cases assigned to you</p>
          </div>
        ) : (
          cases.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.type === 'compliance' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {c.type.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                      c.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      c.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {c.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{c.description}</p>
                  
                  {c.resolution && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                      <p className="text-sm font-medium text-green-800 mb-1">Resolution</p>
                      <p className="text-sm text-green-700">{c.resolution}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Assigned by {getAssignedByUser(c.assignedBy)?.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(c.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {c.status !== 'resolved' && c.status !== 'closed' && (
                  <div className="flex flex-row md:flex-col gap-2">
                    {c.status === 'open' && (
                      <button
                        onClick={() => handleUpdateStatus(c.id, 'in_progress')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Start
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedCase(c)
                        setIsModalOpen(true)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      Resolve
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Resolution</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight className="h-6 w-6 rotate-45" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case</label>
                  <p className="text-gray-900">{selectedCase.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                  <textarea
                    rows={4}
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Enter how you resolved this case..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddResolution}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Submit Resolution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
