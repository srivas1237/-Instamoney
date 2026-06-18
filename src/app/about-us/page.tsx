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
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#050a14] mb-6">
              About Kashless
            </h1>
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
              Your trusted partner for all your financial needs. We make borrowing simple, fast, and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-[#050a14] mb-2">{stat.number}</p>
                <p className="text-[#6b7280]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-8">Our Story</h2>
          <p className="text-lg text-[#6b7280] mb-6">
            Kashless was founded with a simple mission: to make credit accessible to everyone. We believe that 
            financial inclusion is the key to empowering individuals and businesses.
          </p>
          <p className="text-lg text-[#6b7280]">
            Our team of financial experts and technology enthusiasts work together to provide you with the best 
            loan options with minimal documentation and quick approval processes.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8">
                <div className="bg-[#0052ff] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#050a14] mb-3">{value.title}</h3>
                <p className="text-[#6b7280]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-[#6b7280] mb-8">Apply now and get the funds you need</p>
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

