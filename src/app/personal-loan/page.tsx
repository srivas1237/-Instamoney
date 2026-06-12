import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Wallet, FileText, ArrowRight } from 'lucide-react'
import LoanForm from '@/components/LoanForm'

export const metadata: Metadata = {
  title: 'Personal Loan - Instant Approval | InstaMoney',
  description: 'Get unsecured personal loan from ₹10,000 to ₹50,00,000 with quick disbursement and flexible repayment options.',
}

const features = [
  'Loan Amount: ₹10,000 – ₹50,00,000',
  'Tenure: 3 – 84 Months',
  'Quick Disbursement',
  'Minimal Documentation',
  'Competitive Interest Rates',
  'No Collateral Required',
]

const eligibility = [
  'Age: 21-60 Years',
  'Indian Resident',
  'Stable Income Source',
  'Good Credit Score',
]

const documents = [
  'PAN Card',
  'Aadhaar Card',
  'Bank Statements (Last 6 Months)',
  'Income Proof (Salary Slips / ITR)',
]

export default function PersonalLoanPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")',
          }}
        ></div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Gold gradient accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-gray-100">
              <Link href="/" className="text-gray-400 hover:text-amber-300 mb-6 inline-flex items-center gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="gold-text">Personal Loan</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Unsecured loan for personal needs. Get quick approval with minimal documentation.
              </p>
            </div>
            <div className="relative">
              <LoanForm defaultLoanType="personal" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Key Features</h2>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Eligibility</h2>
              <ul className="space-y-4">
                {eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Documents Required</h2>
              <ul className="space-y-4">
                {documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-effect rounded-3xl p-12 border border-amber-900/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-6">Ready to Apply?</h2>
          <p className="text-xl text-gray-400 mb-8">Get instant approval for your personal loan</p>
          <Link
            href="/contact-us"
            className="gold-gradient text-black px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/40 transition-all inline-block"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  )
}
