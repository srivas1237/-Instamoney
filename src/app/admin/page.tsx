'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getDashboardStats, getReports } from '@/lib/storage'

type DashboardStats = {
  totalLeads: number
  newLeads: number
  inProgressLeads: number
  approvedLeads: number
  recentLeads: any[]
  totalCases: number
  openCases: number
}

type ReportBucket = { _id: string; count: number }
type ReportsData = {
  leadsByStatus: ReportBucket[]
  leadsByType: ReportBucket[]
  casesByStatus: ReportBucket[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [reports, setReports] = useState<ReportsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const refresh = async (showLoading: boolean) => {
      if (showLoading) setIsLoading(true)
      try {
        const [nextStats, nextReports] = await Promise.all([getDashboardStats(), getReports()])
        if (!isMounted) return
        setStats(nextStats as DashboardStats)
        setReports(nextReports as ReportsData)
      } finally {
        if (showLoading && isMounted) setIsLoading(false)
      }
    }

    refresh(true)

    const onLeadsUpdated = () => refresh(false)
    window.addEventListener('insta:leads_updated', onLeadsUpdated)

    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel('instamoney')
      bc.onmessage = (event) => {
        if (event?.data?.type === 'leads_updated') refresh(false)
      }
    } catch {}

    const intervalId = window.setInterval(() => refresh(false), 10000)

    return () => {
      isMounted = false
      window.removeEventListener('insta:leads_updated', onLeadsUpdated)
      if (bc) bc.close()
      window.clearInterval(intervalId)
    }
  }, [])

  const loanTypeData = () => {
    const buckets = Array.isArray(reports?.leadsByType) ? reports!.leadsByType : []
    return buckets.map((b) => ({ name: b._id, value: b.count }))
  }

  const statusData = () => {
    const buckets = Array.isArray(reports?.leadsByStatus) ? reports!.leadsByStatus : []
    return buckets.map((b) => ({ name: b._id, value: b.count }))
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const statCards = [
    { label: 'Total Leads', value: stats?.totalLeads ?? 0, color: 'bg-blue-500' },
    { label: 'New Leads', value: stats?.newLeads ?? 0, color: 'bg-green-500' },
    { label: 'In Progress', value: stats?.inProgressLeads ?? 0, color: 'bg-yellow-500' },
    { label: 'Approved', value: stats?.approvedLeads ?? 0, color: 'bg-purple-500' }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome to InstaMoney Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
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

      {isLoading && (
        <div className="text-sm text-gray-500 mb-6">Loading dashboard...</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
