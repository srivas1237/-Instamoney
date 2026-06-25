'use client'

import { useEffect, useState } from 'react'
import { Download, Plus, User, Phone, Mail, DollarSign, ArrowRight, Trash2 } from 'lucide-react'
import { createLead, deleteLead, getCurrentAdminUser, getLeads, getLoanTypeLabel, InstaLead, InstaAdminUser, LOAN_TYPE_OPTIONS, updateLead } from '@/lib/storage'

const normalizeLeads = (data: any): InstaLead[] => {
  if (!Array.isArray(data)) return []
  return data.map((lead: any) => ({
    ...lead,
    id: (lead?.id || lead?._id || '').toString(),
    createdAt: lead?.createdAt ? new Date(lead.createdAt).toISOString() : new Date().toISOString(),
  }))
}

export default function LeadsPage() {
  const [leads, setLeadsState] = useState<InstaLead[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<InstaAdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [submitError, setSubmitError] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loanType: 'personal',
    amount: '',
    notes: '',
  })

  useEffect(() => {
    const currentUser = getCurrentAdminUser()
    setUser(currentUser)
    let isMounted = true
    const refresh = async (showLoading: boolean) => {
      if (showLoading) setIsLoading(true)
      try {
        const data = await getLeads()
        if (!isMounted) return
        setLeadsState(normalizeLeads(data))
      } finally {
        if (showLoading && isMounted) setIsLoading(false)
      }
    }

    refresh(true)

    const onLeadsUpdated = () => refresh(false)
    window.addEventListener('kashless:leads_updated', onLeadsUpdated)

    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel('kashless')
      bc.onmessage = (event) => {
        if (event?.data?.type === 'leads_updated') refresh(false)
      }
    } catch {}

    const intervalId = window.setInterval(() => refresh(false), 10000)

    return () => {
      isMounted = false
      window.removeEventListener('kashless:leads_updated', onLeadsUpdated)
      if (bc) bc.close()
      window.clearInterval(intervalId)
    }
  }, [])

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus)

  const exportCsv = () => {
    const escapeValue = (value: unknown) => {
      const raw = value === null || value === undefined ? '' : String(value)
      const escaped = raw.replace(/"/g, '""')
      return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped
    }

    const header = ['Name', 'Phone', 'Email', 'Loan Type', 'Amount', 'Status', 'Created At', 'Notes']
    const rows = (Array.isArray(filteredLeads) ? filteredLeads : []).map((lead) => [
      escapeValue(lead.name),
      escapeValue(lead.phone),
      escapeValue(lead.email),
      escapeValue(getLoanTypeLabel(lead.loanType || '')),
      escapeValue(lead.amount),
      escapeValue(lead.status),
      escapeValue(lead.createdAt),
      escapeValue(lead.notes || ''),
    ])

    const csv = ['\uFEFF' + header.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kashless-leads-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    if (user.role === 'super_admin') return true
    if (user.role === 'admin') {
      return ['view_leads', 'edit_leads'].includes(permission)
    }
    if (user.role === 'agent') {
      return ['view_leads', 'edit_leads'].includes(permission)
    }
    return false
  }

  const canEdit = hasPermission('edit_leads')
  const canDelete = user?.role === 'super_admin'

  const updateLeadStatus = async (id: string, newStatus: InstaLead['status']) => {
    const nextLeads = leads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    setLeadsState(nextLeads)
    try {
      await updateLead(id, { status: newStatus })
    } catch {
      const data = await getLeads()
      setLeadsState(normalizeLeads(data))
    }
  }

  const handleDeleteLead = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const nextLeads = leads.filter((lead) => lead.id !== id)
      setLeadsState(nextLeads)
      try {
        await deleteLead(id)
      } catch {
        const data = await getLeads()
        setLeadsState(normalizeLeads(data))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    try {
      const created = await createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        loanType: formData.loanType,
        amount: formData.amount,
        notes: formData.notes,
      })
      const createdLead = normalizeLeads([created])[0]
      if (createdLead) {
        setLeadsState([createdLead, ...leads])
      }
      setIsModalOpen(false)
      setFormData({
        name: '',
        phone: '',
        email: '',
        loanType: 'personal',
        amount: '',
        notes: '',
      })

      try {
        const data = await getLeads()
        setLeadsState(normalizeLeads(data))
      } catch {
        // ignore refresh failure, optimistic update already applied
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to create lead')
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-[#737780]">Manage all loan applications</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-4 py-2 text-white hover:border-[#ff825c]/40 hover:bg-white/5 transition-colors"
          >
            <Download className="h-5 w-5" />
            Export CSV
          </button>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="tp-select h-10 px-3 pr-10"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="disbursed">Disbursed</option>
          </select>
          {canEdit && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0052ff] text-white rounded-lg hover:bg-[#003ecf] transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Lead
            </button>
          )}
        </div>
      </div>

      <div className="tp-card overflow-hidden">
        {isLoading && (
          <div className="p-6 text-sm text-[#737780]">Loading leads...</div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Loan Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737780] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black/10 divide-y divide-white/10">
              {(Array.isArray(filteredLeads) ? filteredLeads : []).map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#f5f5f5]">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#f5f5f5]">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#f5f5f5]">{getLoanTypeLabel(lead.loanType || '')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#f5f5f5]">{lead.amount ? '₹' + lead.amount : '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'approved' ? 'bg-purple-100 text-purple-800' :
                      lead.status === 'disbursed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lead.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#737780]">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {canEdit && (
                        <select 
                          value={lead.status} 
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className="tp-select h-9 px-2.5 pr-8 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="disbursed">Disbursed</option>
                        </select>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => handleDeleteLead(lead.id)} 
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(Array.isArray(filteredLeads) ? filteredLeads.length : 0) === 0 && (
          <div className="text-center py-12">
            <p className="text-[#737780]">No leads found</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Lead</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight className="h-6 w-6 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Loan Amount
                    </label>
                    <input
                      required
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                  <select
                    value={formData.loanType}
                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                    className="tp-select h-10 px-3 pr-10"
                  >
                    {LOAN_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes (optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
                  />
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
                    Add Lead
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
