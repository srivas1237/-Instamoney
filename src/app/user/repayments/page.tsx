'use client'

import { useEffect, useState } from 'react'
import { CreditCard, Calendar, CheckCircle, Clock } from 'lucide-react'
import type { LoanApplication, RepaymentScheduleItem } from '../../../components/LoanForm'

export default function UserRepaymentsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [applications, setApplications] = useState<LoanApplication[]>([])

  useEffect(() => {
    const user = localStorage.getItem('insta_user')
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      
      const userApplications = JSON.parse(
        localStorage.getItem(`user_${userData.id}_applications`) || '[]'
      )
      
      // For demo, generate repayment schedules for disbursed loans
      const updatedApplications = userApplications.map((app: LoanApplication) => {
        if (app.stage === 'disbursed' && !app.repaymentSchedule) {
          const amount = app.approvedAmount || parseInt(app.loanAmount)
          const tenure = app.tenureMonths || 24
          const rate = app.interestRate || 12
          
          // Simple EMI calculation for demo
          const monthlyRate = rate / 12 / 100
          const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1)
          
          const schedule: RepaymentScheduleItem[] = []
          for (let i = 0; i < tenure; i++) {
            const dueDate = new Date()
            dueDate.setMonth(dueDate.getMonth() + i + 1)
            schedule.push({
              id: i + 1,
              dueDate: dueDate.toISOString(),
              amount: Math.round(emi),
              status: i < 3 ? 'paid' : 'pending', // Mark first 3 as paid for demo
              paymentDate: i < 3 ? new Date(Date.now() - (3 - i) * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined
            })
          }
          
          return {
            ...app,
            approvedAmount: amount,
            tenureMonths: tenure,
            interestRate: rate,
            emiAmount: Math.round(emi),
            repaymentSchedule: schedule
          }
        }
        return app
      })
      
      setApplications(updatedApplications)
    }
  }, [])

  const activeLoans = applications.filter(app => app.stage === 'disbursed')

  const getStatusIcon = (status: string) => {
    if (status === 'paid') return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status === 'overdue') return <Clock className="h-5 w-5 text-red-500" />
    return <Clock className="h-5 w-5 text-yellow-500" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Repayments</h1>
        <p className="text-gray-600 mt-1">Manage your loan EMIs</p>
      </div>

      {activeLoans.length > 0 ? (
        <div className="space-y-8">
          {activeLoans.map((loan) => (
            <div key={loan.id} className="space-y-6">
              {/* Loan Summary Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 capitalize mb-6">
                  {loan.loanType.replace('-', ' ')} Loan
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{loan.approvedAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">EMI Amount</p>
                    <p className="text-2xl font-bold text-[#0052ff]">
                      ₹{loan.emiAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loan.interestRate}% p.a.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Tenure</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loan.tenureMonths} Months
                    </p>
                  </div>
                </div>
              </div>

              {/* Repayment Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Repayment Schedule
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Installment
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Due Date
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Payment Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loan.repaymentSchedule?.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 text-gray-900 font-medium">
                            #{item.id}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {new Date(item.dueDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-gray-900 font-semibold">
                            ₹{item.amount.toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                                item.status === 'paid'
                                  ? 'bg-green-100 text-green-800'
                                  : item.status === 'overdue'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {getStatusIcon(item.status)}
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Active Loans
          </h3>
          <p className="text-gray-600">
            You don't have any active loans at the moment
          </p>
        </div>
      )}
    </div>
  )
}