import Link from 'next/link'
import { ArrowRight, Zap, Shield, CheckCircle } from 'lucide-react'
import LoanForm from '@/components/LoanForm'

const features = [
  { icon: Zap, title: 'Quick Approval', description: 'Get approval in minutes' },
  { icon: Shield, title: 'No Collateral', description: 'Unsecured loan' },
  { icon: CheckCircle, title: 'Minimal Docs', description: 'Simple documentation' },
]

const eligibility = [
  'Age: 21-60 years',
  'Minimum monthly income: ₹15,000',
  'Good credit score: 650+',
  'Salaried or self-employed',
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Link href="/" className="text-[#5b616e] hover:text-[#eef0f3] mb-6 inline-flex items-center gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Personal Loan
              </h1>
              <p className="text-xl text-[#5b616e] mb-8">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Why Choose Personal Loan?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-black border border-[#0a0b0d] rounded-[40px] p-8">
                <div className="bg-[#eef0f3] w-16 h-16 rounded-[40px] flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#5b616e]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Eligibility Criteria</h2>
              <ul className="space-y-4">
                {eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-[#eef0f3] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-[#5b616e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Required Documents</h2>
              <ul className="space-y-4">
                {documents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-[#eef0f3] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-[#5b616e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-black border border-[#0a0b0d] rounded-[40px] p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Apply?</h2>
          <p className="text-xl text-[#5b616e] mb-8">Get your personal loan approved in minutes</p>
          <Link
            href="/contact-us"
            className="bg-[#eef0f3] text-black px-10 py-4 rounded-[100000px] font-semibold text-lg hover:bg-gray-200 transition-all inline-block"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  )
}
