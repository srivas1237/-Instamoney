'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getLeads, setLeads, InstaUser, InstaLead } from '@/lib/storage'

interface LoanFormProps {
  defaultLoanType?: string
}

// Application stages for tracking
export type ApplicationStage = 
  | 'submitted'
  | 'document_verification'
  | 'credit_check'
  | 'approval'
  | 'sanctioned'
  | 'disbursed'
  | 'rejected'

export interface RepaymentScheduleItem {
  id: number
  dueDate: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  paymentDate?: string
}

export interface LoanApplication {
  id: number
  userId: string
  fullName: string
  mobileNumber: string
  email: string
  city: string
  loanType: string
  monthlyIncome: string
  employmentType: string
  loanAmount: string
  status: string
  stage: ApplicationStage
  createdAt: string
  approvedAmount?: number
  interestRate?: number
  tenureMonths?: number
  emiAmount?: number
  repaymentSchedule?: RepaymentScheduleItem[]
}

export default function LoanForm({ defaultLoanType }: LoanFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
    loanType: defaultLoanType || '',
    monthlyIncome: '',
    employmentType: '',
    loanAmount: '',
  })
  const [currentUser, setCurrentUserState] = useState<InstaUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) setCurrentUserState(user)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // If no user logged in, redirect to login first
    if (!currentUser) {
      alert('Please login to apply for a loan!')
      router.push('/user/login')
      return
    }
    
    // Create a more detailed loan application with stages
    const newApplication: LoanApplication = {
      id: Date.now(),
      userId: currentUser.id,
      ...formData,
      status: 'new',
      stage: 'submitted',
      createdAt: new Date().toISOString(),
    }
    
    // Save to both loan_leads and user's applications
    const existingLeads = JSON.parse(localStorage.getItem('loan_leads') || '[]')
    localStorage.setItem('loan_leads', JSON.stringify([newApplication, ...existingLeads]))
    
    // Also save to our new leads storage
    const newLead: InstaLead = {
      id: newApplication.id.toString(),
      name: newApplication.fullName,
      phone: newApplication.mobileNumber,
      email: newApplication.email,
      loanType: newApplication.loanType,
      amount: newApplication.loanAmount,
      status: newApplication.status,
      createdAt: newApplication.createdAt,
      userId: newApplication.userId,
    }
    const existingNewLeads = getLeads()
    setLeads([newLead, ...existingNewLeads])
    
    const userApplications = JSON.parse(localStorage.getItem(`user_${currentUser.id}_applications`) || '[]')
    localStorage.setItem(`user_${currentUser.id}_applications`, JSON.stringify([newApplication, ...userApplications]))
    
    // Add a notification for user
    const userNotifications = JSON.parse(localStorage.getItem(`user_${currentUser.id}_notifications`) || '[]')
    const newNotification = {
      id: Date.now(),
      title: 'Application Submitted!',
      message: `Your ${formData.loanType} loan application has been submitted successfully.`,
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(`user_${currentUser.id}_notifications`, JSON.stringify([newNotification, ...userNotifications]))
    
    alert('Thank you for your application! We will contact you soon. You can track your application from your dashboard.')
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      city: '',
      loanType: defaultLoanType || '',
      monthlyIncome: '',
      employmentType: '',
      loanAmount: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-6 md:p-8 shadow-xl">
      <h3 className="text-xl md:text-2xl font-bold text-[#050a14] mb-6">Apply Now</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
              placeholder="Enter your city"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Loan Type</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
            >
              <option value="">Select Loan Type</option>
              <option value="personal-loan">Personal Loan</option>
              <option value="home-loan">Home Loan</option>
              <option value="loan-against-property">Loan Against Property</option>
              <option value="short-term-loan">Short Term Loan</option>
              <option value="payday-loan">Payday Loan</option>
              <option value="car-loan">Car Loan</option>
              <option value="two-wheeler-loan">Two Wheeler Loan</option>
              <option value="advance-salary">Advance Salary</option>
              <option value="invoice-finance">Invoice Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Monthly Income</label>
            <select
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
            >
              <option value="">Select Monthly Income</option>
              <option value="0-15000">Below ₹15,000</option>
              <option value="15000-30000">₹15,000 - ₹30,000</option>
              <option value="30000-50000">₹30,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000+">Above ₹1,00,000</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
            >
              <option value="">Select Employment Type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
              <option value="gig">Gig Worker</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Loan Amount Required</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#050a14] focus:border-[#0052ff] focus:outline-none transition-all"
              placeholder="Enter loan amount"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#0052ff] text-white px-6 py-3.5 rounded-full font-semibold text-lg hover:bg-[#003ecf] transition-all"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}
