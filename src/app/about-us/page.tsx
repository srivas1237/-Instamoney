import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - InstaMoney',
  description: 'Learn about InstaMoney - Your trusted partner for quick and hassle-free loans.',
}

const stats = [
  { number: '50K+', label: 'Happy Customers' },
  { number: '₹500Cr+', label: 'Loans Disbursed' },
  { number: '4.9★', label: 'Customer Rating' },
  { number: '99%', label: 'Approval Rate' },
]

const values = [
  { icon: Zap, title: 'Speed', description: 'Quick approval and disbursement process' },
  { icon: Shield, title: 'Security', description: 'Your data is safe and secure with us' },
  { icon: TrendingUp, title: 'Transparency', description: 'No hidden charges, complete transparency' },
  { icon: Users, title: 'Customer First', description: 'Your satisfaction is our priority' },
]

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-100">
            <Link href="/" className="text-gray-400 hover:text-amber-300 mb-6 inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="gold-text">InstaMoney</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner for quick and hassle-free loans. We are committed to making finance accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center glass-effect rounded-3xl p-8 border border-amber-900/30">
                <div className="text-4xl font-bold gold-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Our Story</h2>
          </div>
          <div className="prose prose-invert max-w-none text-gray-300">
            <p className="text-xl mb-6">
              InstaMoney was founded with a simple mission: to make credit accessible to everyone who needs it, when they need it.
            </p>
            <p className="mb-6">
              We understand that financial emergencies can arise at any time, and traditional banking processes can be slow and cumbersome.
              That's why we've built a completely digital platform that provides instant loan approvals with minimal documentation.
            </p>
            <p>
              Our team of financial experts and tech enthusiasts work together to ensure that your loan journey is smooth, transparent,
              and secure. With InstaMoney, you're not just getting a loan - you're getting a financial partner you can trust.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Our Values</h2>
            <p className="text-xl text-gray-400">The principles that guide us every day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="glass-effect rounded-3xl p-8 hover:shadow-xl transition-all border border-amber-900/30">
                <div className="gold-gradient w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-400 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-effect rounded-3xl p-12 border border-amber-900/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of happy customers and get your loan today</p>
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
