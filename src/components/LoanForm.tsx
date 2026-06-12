'use client'

import { useState } from 'react'

interface LoanFormProps {
  defaultLoanType?: string
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your application! We will contact you soon.')
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
    <div className="glass-effect rounded-3xl p-6 md:p-8 border border-amber-900/30 shadow-xl">
      <h3 className="text-xl md:text-2xl font-bold gold-text mb-6">Apply Now</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              placeholder="Enter your city"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Loan Type</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              <option value="">Select Loan Type</option>
              <option value="personal">Personal Loan</option>
              <option value="home">Home Loan</option>
              <option value="lap">Loan Against Property</option>
              <option value="short-term">Short Term Loan</option>
              <option value="payday">Payday Loan</option>
              <option value="car">Car Loan</option>
              <option value="two-wheeler">Two Wheeler Loan</option>
              <option value="advance-salary">Advance Salary</option>
              <option value="invoice-finance">Invoice Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Monthly Income</label>
            <select
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
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
            <label className="block text-sm font-medium text-gray-300 mb-1">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              <option value="">Select Employment Type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
              <option value="gig">Gig Worker</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Loan Amount Required</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-amber-900/40 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              placeholder="Enter loan amount"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full gold-gradient text-black py-3.5 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/40 transition-all"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}
