'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, createLead, InstaUser } from '@/lib/storage'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) setCurrentUserState(user)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // If no user logged in, redirect to login first
    if (!currentUser) {
      alert('Please login to apply for a loan!')
      router.push('/user/login')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create lead using backend API
      const leadData = {
        name: formData.fullName,
        phone: formData.mobileNumber,
        email: formData.email,
        loanType: formData.loanType,
        amount: formData.loanAmount,
        status: 'new',
        userId: currentUser.id || currentUser._id,
        notes: `City: ${formData.city}, Monthly Income: ${formData.monthlyIncome}, Employment: ${formData.employmentType}`
      }
      
      await createLead(leadData)
      
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
    } catch (error: any) {
      alert(`Error submitting application: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="tp-card p-4 sm:p-5">
      <div className="mb-4 space-y-2.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-[15rem]">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#ff825c]">Start Application</p>
            <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
              Apply online with Kashless
            </h3>
          </div>
          <span className="rounded-full border border-[#ff825c]/30 bg-[#ff825c]/10 px-3 py-1 text-[11px] font-medium text-[#ff825c]">
            Smart form
          </span>
        </div>
        <p className="max-w-md text-sm leading-5 text-[#737780]">
          Share a few details and continue your loan journey.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="tp-input h-12 px-4"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="tp-input h-12 px-4"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="tp-input h-12 px-4"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="tp-input h-12 px-4"
              placeholder="Enter your city"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Loan Type</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
              className="tp-select h-12 px-4 pr-10"
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
            <label className="mb-1.5 block text-sm font-medium text-white">Monthly Income</label>
            <select
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
              className="tp-select h-12 px-4 pr-10"
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
        <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
              className="tp-select h-12 px-4 pr-10"
            >
              <option value="">Select Employment Type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
              <option value="gig">Gig Worker</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
              className="tp-input h-12 px-4"
              placeholder="Enter loan amount"
            />
          </div>
        </div>
        <p className="border-t border-white/10 pt-2 text-xs leading-5 text-[#737780]">
          By submitting, you agree that Kashless may contact you regarding your application.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="tp-button-primary mt-1 w-full px-6 py-3 text-sm sm:text-base"
        >
          {isSubmitting ? 'Submitting...' : 'Continue Application'}
        </button>
      </form>
    </div>
  )
}
