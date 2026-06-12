'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Zap,
  Shield,
  Wallet,
  TrendingUp,
  Lock,
  CheckCircle,
  Home,
  Building,
  Briefcase,
  Clock,
  DollarSign,
  Car,
  Bike,
  Calendar,
  FileText,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react'
import LoanForm from '@/components/LoanForm'

const features = [
  { icon: Zap, title: 'Quick Approval', description: 'Get your loan approved in minutes' },
  { icon: FileText, title: 'Digital Process', description: '100% online application process' },
  { icon: Calendar, title: 'Flexible Repayment', description: 'Choose tenure as per your convenience' },
  { icon: TrendingUp, title: 'Competitive Rates', description: 'Lowest interest rates in market' },
  { icon: Lock, title: 'Secure & Transparent', description: 'Your data is safe with us' },
  { icon: Wallet, title: 'Multiple Options', description: 'Choose from various loan products' },
]

const loanCategories = [
  { 
    name: 'Personal Loan', 
    href: '/personal-loan', 
    icon: Wallet,
    line1: 'Quick funds for any personal needs',
    line2: 'Minimal documentation & fast approval'
  },
  { 
    name: 'Home Loan', 
    href: '/home-loan', 
    icon: Home,
    line1: 'Make your dream home a reality',
    line2: 'Low interest rates & long tenure options'
  },
  { 
    name: 'Loan Against Property', 
    href: '/loan-against-property', 
    icon: Building,
    line1: 'Unlock the value of your property',
    line2: 'High loan amount at competitive rates'
  },
  { 
    name: 'Short Term Loan', 
    href: '/short-term-loan', 
    icon: Clock,
    line1: 'Instant funds for urgent needs',
    line2: 'Flexible repayment options available'
  },
  { 
    name: 'Payday Loan', 
    href: '/payday-loan', 
    icon: DollarSign,
    line1: 'Salary advance before payday',
    line2: 'Quick approval & easy repayment'
  },
  { 
    name: 'Car Loan', 
    href: '/car-loan', 
    icon: Car,
    line1: 'Drive your dream car home',
    line2: '100% financing on new & used cars'
  },
  { 
    name: 'Two Wheeler Loan', 
    href: '/two-wheeler-loan', 
    icon: Bike,
    line1: 'Ride your favorite bike/scooter',
    line2: 'Easy EMI options with low down payment'
  },
  { 
    name: 'Advance Salary', 
    href: '/advance-salary', 
    icon: Calendar,
    line1: 'Access your earned salary anytime',
    line2: 'No hidden charges & quick disbursal'
  },
  { 
    name: 'Invoice Finance', 
    href: '/invoice-finance', 
    icon: FileText,
    line1: 'Manage your business cash flow',
    line2: 'Get funds against unpaid invoices'
  },
]

const howItWorks = [
  { step: 1, title: 'Apply Online', description: 'Fill our simple application form' },
  { step: 2, title: 'Document Verification', description: 'Upload your documents digitally' },
  { step: 3, title: 'Credit Assessment', description: 'Quick eligibility check' },
  { step: 4, title: 'Loan Approval', description: 'Get instant approval decision' },
  { step: 5, title: 'Disbursement', description: 'Money in your account within hours' },
]

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Salaried Employee',
    content: 'Got my personal loan approved in just 2 hours! Amazing service and very transparent process.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Business Owner',
    content: 'The invoice finance option really helped me manage my cash flow. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Self Employed',
    content: 'Home loan process was so smooth. Competitive interest rates and excellent customer support.',
    rating: 5,
  },
]

const faqs = [
  {
    question: 'What documents are required for a personal loan?',
    answer: 'You need PAN card, Aadhaar card, bank statements, and income proof.',
  },
  {
    question: 'How long does it take to get loan approval?',
    answer: 'With our digital process, you can get approval within minutes.',
  },
  {
    question: 'What is the minimum credit score required?',
    answer: 'A credit score of 650 and above is preferred for most loan products.',
  },
  {
    question: 'Can I prepay my loan?',
    answer: 'Yes, you can prepay your loan with minimal or no charges depending on the product.',
  },
  {
    question: 'Is there any processing fee?',
    answer: 'Processing fees vary by loan type and are clearly mentioned during application.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-[#050a14]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Fast & Hassle-Free Loans for Every Need
              </h1>
              <p className="text-xl text-[#6b7280] mb-8">
                Personal Loan, Home Loan, LAP, Payday Loan, Vehicle Loan & Business Financing Solutions.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/contact-us"
                  className="bg-[#0052ff] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#003ecf] transition-all"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact-us"
                  className="border-2 border-[#0052ff] text-[#0052ff] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#f9fafb] transition-all"
                >
                  Check Eligibility
                </Link>
              </div>
              <div className="flex items-center gap-10">
                <div>
                  <p className="text-4xl font-bold text-[#050a14]">50K+</p>
                  <p className="text-[#6b7280]">Happy Customers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#050a14]">₹500Cr+</p>
                  <p className="text-[#6b7280]">Loans Disbursed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#050a14]">4.9★</p>
                  <p className="text-[#6b7280]">Customer Rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <LoanForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-4">Why Choose InstaMoney</h2>
            <p className="text-xl text-[#6b7280]">Experience the difference with our customer-first approach</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#0052ff] transition-all"
              >
                <div className="bg-[#0052ff] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#050a14] mb-3">{feature.title}</h3>
                <p className="text-[#6b7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-4">Our Loan Products</h2>
            <p className="text-xl text-[#6b7280]">Choose the right loan for your needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanCategories.map((category, idx) => (
              <Link
                key={idx}
                href={category.href}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#0052ff] transition-all group"
              >
                <div className="bg-[#0052ff] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#050a14] mb-3">{category.name}</h3>
                <p className="text-[#6b7280] mb-1">{category.line1}</p>
                <p className="text-gray-500 mb-4">{category.line2}</p>
                <div className="flex items-center text-[#0052ff] font-medium group-hover:gap-2 gap-1 transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-4">How It Works</h2>
            <p className="text-xl text-[#6b7280]">Simple 5-step process to get your loan</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="bg-[#0052ff] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#050a14] mb-2">{step.title}</h3>
                <p className="text-[#6b7280]">{step.description}</p>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full">
                    <ChevronRight className="h-8 w-8 text-[#e5e7eb] mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-4">What Our Customers Say</h2>
            <p className="text-xl text-[#6b7280]">Hear from our happy customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-[#fbbf24] fill-[#fbbf24]" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#6b7280] mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-[#050a14]">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-[#6b7280]">Got questions? We've got answers</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#050a14] mb-6">Ready to Get Your Loan?</h2>
          <p className="text-xl text-[#6b7280] mb-8">Apply now and get instant approval</p>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-[#050a14]">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-[#0052ff]" />
        ) : (
          <Plus className="h-5 w-5 text-[#0052ff]" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-[#6b7280]">{answer}</div>
      )}
    </div>
  )
}
