'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  ArrowLeft,
} from 'lucide-react'
import type { LoanApplication, ApplicationStage } from '../../../components/LoanForm'

const stageOrder: ApplicationStage[] = [
  'submitted',
  'document_verification',
  'credit_check',
  'approval',
  'sanctioned',
  'disbursed',
]

const stageLabels: Record<ApplicationStage, string> = {
  submitted: 'Application Submitted',
  document_verification: 'Document Verification',
  credit_check: 'Credit Check',
  approval: 'Approval',
  sanctioned: 'Loan Sanctioned',
  disbursed: 'Loan Disbursed',
  rejected: 'Rejected',
}

export default function UserApplicationsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [applications, setApplications] = useState<LoanApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('insta_user')
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      
      const userApplications = JSON.parse(
        localStorage.getItem(`user_${userData.id}_applications`) || '[]'
      )
      setApplications(userApplications)
    }
  }, [])

  const getStageIcon = (stage: ApplicationStage) => {
    if (stage === 'rejected') return <AlertCircle className="h-6 w-6 text-red-500" />
    if (stage === 'disbursed') return <CheckCircle className="h-6 w-6 text-green-500" />
    return <Clock className="h-6 w-6 text-yellow-500" />
  }

  const getStageColor = (stage: ApplicationStage) => {
    if (stage === 'rejected') return 'text-red-600 bg-red-100'
    if (stage === 'disbursed') return 'text-green-600 bg-green-100'
    return 'text-yellow-600 bg-yellow-100'
  }

  return (
    <div className="space-y-6">
      {selectedApplication ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedApplication(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Applications
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {selectedApplication.loanType.replace('-', ' ')} Loan
                </h1>
                <p className="text-gray-600">
                  Applied on {new Date(selectedApplication.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStageColor(
                  selectedApplication.stage
                )}`}
              >
                {getStageIcon(selectedApplication.stage)}
                {stageLabels[selectedApplication.stage]}
              </span>
            </div>

            {/* Application Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Personal Details
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-900">
                    <span className="font-medium">Name:</span> {selectedApplication.fullName}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Email:</span> {selectedApplication.email}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Phone:</span> {selectedApplication.mobileNumber}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">City:</span> {selectedApplication.city}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Loan Details
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-900">
                    <span className="font-medium">Loan Amount:</span> ₹{parseInt(selectedApplication.loanAmount).toLocaleString()}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Monthly Income:</span> {selectedApplication.monthlyIncome}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Employment:</span> {selectedApplication.employmentType}
                  </p>
                  {selectedApplication.approvedAmount && (
                    <p className="text-gray-900">
                      <span className="font-medium">Approved Amount:</span> ₹{selectedApplication.approvedAmount.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Application Stages */}
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Application Progress
            </h3>
            <div className="space-y-4">
              {stageOrder.map((stage, index) => {
                const currentStageIndex = stageOrder.indexOf(selectedApplication.stage)
                const isCompleted = 
                  selectedApplication.stage === 'disbursed' || 
                  index < currentStageIndex
                const isCurrent = selectedApplication.stage === stage
                
                return (
                  <div key={stage} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isCurrent
                            ? 'bg-yellow-500 border-yellow-500 text-white'
                            : 'bg-gray-200 border-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      {index < stageOrder.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 mt-2 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p
                        className={`font-semibold ${
                          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {stageLabels[stage]}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-yellow-600 mt-1">In Progress</p>
                      )}
                    </div>
                  </div>
                )
              })}
              {selectedApplication.stage === 'rejected' && (
                <div className="flex items-start gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center border-2 bg-red-500 border-red-500 text-white">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600">Application Rejected</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your application has been rejected
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">Track all your loan applications</p>
          </div>

          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedApplication(app)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-[#0052ff] rounded-xl flex items-center justify-center text-white">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {app.loanType.replace('-', ' ')} Loan
                        </h3>
                        <p className="text-gray-600">
                          Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{parseInt(app.loanAmount).toLocaleString()}
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full mt-1 ${
                          app.stage === 'disbursed'
                            ? 'bg-green-100 text-green-800'
                            : app.stage === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {stageLabels[app.stage]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Applications Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Apply for a loan to get started
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#0052ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#003ecf] transition-all"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}