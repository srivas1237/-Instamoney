'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(100000)
  const [interestRate, setInterestRate] = useState<number>(10)
  const [loanTenure, setLoanTenure] = useState<number>(3)
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years')

  const calculateEMI = () => {
    const principal = loanAmount
    const rate = interestRate / 12 / 100
    const time = tenureType === 'years' ? loanTenure * 12 : loanTenure

    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1)
    const totalAmount = emi * time
    const totalInterest = totalAmount - principal

    return {
      emi: isNaN(emi) ? 0 : emi,
      totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest
    }
  }

  const { emi, totalAmount, totalInterest } = calculateEMI()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <Link href="/" className="text-[#6b7280] hover:text-[#0052ff] mb-6 inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#050a14] mb-4">
              EMI Calculator
            </h1>
            <p className="text-xl text-[#6b7280]">
              Calculate your monthly EMI for any loan amount, interest rate, and tenure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Section */}
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-3xl p-8 md:p-10">
              <div className="space-y-8">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-lg font-semibold text-[#050a14]">
                      Loan Amount
                    </label>
                    <span className="text-xl font-bold text-[#0052ff]">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#0052ff]"
                  />
                  <div className="flex justify-between mt-2 text-sm text-[#6b7280]">
                    <span>₹1,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-lg font-semibold text-[#050a14]">
                      Interest Rate (p.a.)
                    </label>
                    <span className="text-xl font-bold text-[#0052ff]">
                      {interestRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#0052ff]"
                  />
                  <div className="flex justify-between mt-2 text-sm text-[#6b7280]">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-lg font-semibold text-[#050a14]">
                      Loan Tenure
                    </label>
                    <span className="text-xl font-bold text-[#0052ff]">
                      {loanTenure} {tenureType}
                    </span>
                  </div>
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => setTenureType('years')}
                      className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                        tenureType === 'years'
                          ? 'bg-[#0052ff] text-white'
                          : 'bg-white border border-[#e5e7eb] text-[#050a14] hover:bg-[#f9fafb]'
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setTenureType('months')}
                      className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                        tenureType === 'months'
                          ? 'bg-[#0052ff] text-white'
                          : 'bg-white border border-[#e5e7eb] text-[#050a14] hover:bg-[#f9fafb]'
                      }`}
                    >
                      Months
                    </button>
                  </div>
                  <input
                    type="range"
                    min={tenureType === 'years' ? 1 : 3}
                    max={tenureType === 'years' ? 30 : 360}
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#0052ff]"
                  />
                  <div className="flex justify-between mt-2 text-sm text-[#6b7280]">
                    <span>{tenureType === 'years' ? '1 yr' : '3 mo'}</span>
                    <span>{tenureType === 'years' ? '30 yrs' : '360 mo'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-[#0052ff] border border-[#0052ff] rounded-3xl p-8 text-white">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Monthly EMI</h3>
                <p className="text-4xl font-bold">{formatCurrency(emi)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-6">
                  <h3 className="text-[#6b7280] mb-2">Total Interest</h3>
                  <p className="text-2xl font-bold text-[#050a14]">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-6">
                  <h3 className="text-[#6b7280] mb-2">Total Amount</h3>
                  <p className="text-2xl font-bold text-[#050a14]">{formatCurrency(totalAmount)}</p>
                </div>
              </div>

              <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#050a14] mb-3">Payment Breakup</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#6b7280]">Principal Amount</span>
                      <span className="font-semibold text-[#050a14]">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="w-full bg-[#e5e7eb] rounded-full h-3">
                      <div
                        className="bg-[#0052ff] h-3 rounded-full"
                        style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#6b7280]">Interest Amount</span>
                      <span className="font-semibold text-[#050a14]">{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="w-full bg-[#e5e7eb] rounded-full h-3">
                      <div
                        className="bg-[#fbbf24] h-3 rounded-full"
                        style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact-us"
                className="block text-center bg-[#0052ff] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#003ecf] transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
