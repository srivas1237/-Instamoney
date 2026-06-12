import Link from 'next/link'
import { Zap, Users, TrendingUp, Shield } from 'lucide-react'

const stats = [
  { number: '50K+', label: 'Happy Customers' },
  { number: '₹500Cr+', label: 'Loans Disbursed' },
  { number: '4.9★', label: 'Customer Rating' },
  { number: '100+', label: 'Team Members' },
]

const values = [
  { icon: Zap, title: 'Speed', description: 'Quick approvals and fast disbursement' },
  { icon: Users, title: 'Customer First', description: 'We prioritize your needs' },
  { icon: Shield, title: 'Security', description: 'Your data is safe with us' },
  { icon: TrendingUp, title: 'Transparency', description: 'No hidden charges' },
]

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About InstaMoney
            </h1>
            <p className="text-xl text-[#5b616e] max-w-3xl mx-auto">
              Your trusted partner for all your financial needs. We make borrowing simple, fast, and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-[#5b616e]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Our Story</h2>
          <p className="text-lg text-[#5b616e] mb-6">
            InstaMoney was founded with a simple mission: to make credit accessible to everyone. We believe that 
            financial inclusion is the key to empowering individuals and businesses.
          </p>
          <p className="text-lg text-[#5b616e]">
            Our team of financial experts and technology enthusiasts work together to provide you with the best 
            loan options with minimal documentation and quick approval processes.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-black border border-[#0a0b0d] rounded-[40px] p-8">
                <div className="bg-[#eef0f3] w-16 h-16 rounded-[40px] flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-[#5b616e]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-black border border-[#0a0b0d] rounded-[40px] p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-[#5b616e] mb-8">Apply now and get the funds you need</p>
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
