'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Lead {
  id: number
  loanType: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('loan_leads') || '[]')
    setLeads(savedLeads)
  }, [])

  // Data for charts
  const loanTypeData = () => {
    const counts: Record<string, number> = {}
    leads.forEach(lead => {
      counts[lead.loanType] = (counts[lead.loanType] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }

  const statusData = () => {
    const counts: Record<string, number> = {}
    leads.forEach(lead => {
      counts[lead.status] = (counts[lead.status] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const stats = [
    { label: 'Total Leads', value: leads.length, color: 'bg-blue-500' },
    { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, color: 'bg-green-500' },
    { label: 'In Progress', value: leads.filter(l => l.status === 'in_progress').length, color: 'bg-yellow-500' },
    { label: 'Closed', value: leads.filter(l => l.status === 'closed').length, color: 'bg-gray-500' }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome to InstaMoney Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} h-12 w-12 rounded-lg flex items-center justify-center text-white`}>
                <span className="text-xl font-bold">{stat.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Types Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Leads by Loan Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanTypeData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Leads by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
