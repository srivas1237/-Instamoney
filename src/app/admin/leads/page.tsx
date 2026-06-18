'use client'

import { useEffect, useState } from 'react'
import { ROLE_PERMISSIONS } from '../layout'
import type { LoanApplication, ApplicationStage } from '../../../components/LoanForm'

const statusToStage: Record<string, ApplicationStage> = {
  new: 'submitted',
  in_progress: 'document_verification',
  closed: 'disbursed',
  rejected: 'rejected'
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LoanApplication[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  
  // Get current user to check permissions
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('admin_user')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('loan_leads') || '[]')
    setLeads(savedLeads)
  }, [])

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus)

  const updateLeadStatus = (id: number, newStatus: string) => {
    const newStage = statusToStage[newStatus] || 'submitted'
    
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus, stage: newStage } : lead
    )
    setLeads(updatedLeads)
    localStorage.setItem('loan_leads', JSON.stringify(updatedLeads))
    
    // Also update the user's applications
    const leadToUpdate = updatedLeads.find(l => l.id === id)
    if (leadToUpdate?.userId) {
      const userApplications = JSON.parse(
        localStorage.getItem(`user_${leadToUpdate.userId}_applications`) || '[]'
      )
      const updatedUserApps = userApplications.map((app: LoanApplication) =>
        app.id === id ? { ...app, status: newStatus, stage: newStage } : app
      )
      localStorage.setItem(
        `user_${leadToUpdate.userId}_applications`,
        JSON.stringify(updatedUserApps)
      )
      
      // Add notification for user
      const userNotifications = JSON.parse(
        localStorage.getItem(`user_${leadToUpdate.userId}_notifications`) || '[]'
      )
      const newNotification = {
        id: Date.now(),
        title: 'Application Status Updated!',
        message: `Your ${leadToUpdate.loanType} loan application status is now ${newStatus.replace('_', ' ')}`,
        type: newStatus === 'rejected' ? 'error' : newStatus === 'closed' ? 'success' : 'info',
        read: false,
        createdAt: new Date().toISOString()
      }
      localStorage.setItem(
        `user_${leadToUpdate.userId}_notifications`,
        JSON.stringify([newNotification, ...userNotifications])
      )
    }
  }

  const deleteLead = (id: number) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const leadToDelete = leads.find(l => l.id === id)
      const updatedLeads = leads.filter(lead => lead.id !== id)
      setLeads(updatedLeads)
      localStorage.setItem('loan_leads', JSON.stringify(updatedLeads))
      
      // Also delete from user's applications
      if (leadToDelete?.userId) {
        const userApplications = JSON.parse(
          localStorage.getItem(`user_${leadToDelete.userId}_applications`) || '[]'
        )
        const updatedUserApps = userApplications.filter((app: LoanApplication) => app.id !== id)
        localStorage.setItem(
          `user_${leadToDelete.userId}_applications`,
          JSON.stringify(updatedUserApps)
        )
      }
    }
  }

  const canEdit = user && ROLE_PERMISSIONS[user.role].includes('edit_leads')
  const canDelete = user && ROLE_PERMISSIONS[user.role].includes('delete_leads')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500">Manage all loan applications</p>
        </div>
        <div>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.mobileNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{lead.loanType.replace(/-/g, ' ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'closed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lead.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {lead.stage?.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {canEdit && (
                        <>
                          <select 
                            value={lead.status} 
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => deleteLead(lead.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found</p>
          </div>
        )}
      </div>
    </div>
  )
}