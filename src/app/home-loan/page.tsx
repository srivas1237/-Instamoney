import Link from 'next/link'
import { ArrowRight, Home, Shield, CheckCircle, TrendingUp } from 'lucide-react'
import LoanForm from '@/components/LoanForm'

const features = [
  { icon: Home, title: 'Low Interest', description: 'Competitive rates' },
  { icon: Shield, title: 'High Loan Amount', description: 'Up to 90% of property value' },
  { icon: TrendingUp, title: 'Long Tenure', description: 'Up to 30 years' },
]

const eligibility = [
  'Age: 21-65 years',
  'Minimum monthly income: ₹25,000',
  'Good credit score: 700+',
  'Salaried or self-employed',
]

const documents = [
  'PAN Card',
  'Aadhaar Card',
  'Bank Statements',
  'Property Documents',
]

export default function HomeLoanPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-[#050a14]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#050a14]/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Link href="/" className="text-[#9ca3af] hover:text-[#0052ff] mb-6 inline-flex items-center gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Home Loan
              </h1>
              <p className="text-xl text-[#9ca3af] mb-8">
                Finance for home purchase, construction, renovation. Make your dream home a reality.
              </p>
            </div>
            <div className="relative">
              <LoanForm defaultLoanType="home" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#050a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Why Choose Home Loan?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-[#101725] border border-[#1a2332] rounded-2xl p-8">
                <div className="bg-[#0052ff] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#9ca3af]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-20 bg-[#050a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Eligibility Criteria</h2>
              <ul className="space-y-4">
                {eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-[#0052ff] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#9ca3af]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Required Documents</h2>
              <ul className="space-y-4">
                {documents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-[#0052ff] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#9ca3af]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#050a14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#101725] border border-[#1a2332] rounded-2xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Apply?</h2>
          <p className="text-xl text-[#9ca3af] mb-8">Get your home loan approved</p>
          <Link
            href="/contact-us"
            className="bg-[#0052ff] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#003ecf] transition-all inline-block"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  )
}
