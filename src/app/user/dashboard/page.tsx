'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CreditCard,
  FileText,
  ArrowUpRight,
  CheckCircle,
  Clock,
} from 'lucide-react'
import type { LoanApplication } from '../../../components/LoanForm'

export default function UserDashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [applications, setApplications] = useState<LoanApplication[]>([])
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const user = localStorage.getItem('insta_user')
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      
      const userApplications = JSON.parse(
        localStorage.getItem(`user_${userData.id}_applications`) || '[]'
      )
      setApplications(userApplications)
      
      const userNotifications = JSON.parse(
        localStorage.getItem(`user_${userData.id}_notifications`) || '[]'
      )
      setNotifications(userNotifications)
    }
  }, [])

  const stats = [
    {
      name: 'Total Applications',
      value: applications.length,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'In Progress',
      value: applications.filter(a => a.stage !== 'disbursed' && a.stage !== 'rejected').length,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      name: 'Completed',
      value: applications.filter(a => a.stage === 'disbursed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
  ]

  const recentApplications = applications.slice(0, 3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {currentUser?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome to your InstaMoney dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} h-12 w-12 rounded-xl flex items-center justify-center text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Applications
          </h2>
          <Link
            href="/user/applications"
            className="flex items-center gap-2 text-[#0052ff] hover:text-[#003ecf] font-medium"
          >
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {recentApplications.length > 0 ? (
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-[#0052ff] rounded-lg flex items-center justify-center text-white font-bold">
                    {app.loanType.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">
                      {app.loanType.replace('-', ' ')} Loan
                    </p>
                    <p className="text-sm text-gray-600">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      app.stage === 'disbursed'
                        ? 'bg-green-100 text-green-800'
                        : app.stage === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {app.stage.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              You haven't applied for any loans yet
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0052ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#003ecf] transition-all"
            >
              Apply Now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/user/applications"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Track Applications
              </h3>
              <p className="text-sm text-gray-600">
                Check status of your loan applications
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/user/repayments"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Manage Repayments
              </h3>
              <p className="text-sm text-gray-600">
                View and pay your EMIs
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}