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
  Star,
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
      <section className="relative overflow-hidden bg-black py-20 lg:py-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-amber-600 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] bg-amber-400 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-gray-100">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Fast & Hassle-Free <span className="gold-text">Loans</span> for Every Need
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Personal Loan, Home Loan, LAP, Payday Loan, Vehicle Loan & Business Financing Solutions.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/contact-us"
                  className="gold-gradient text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/40 transition-all"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact-us"
                  className="border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-900/20 transition-all"
                >
                  Check Eligibility
                </Link>
              </div>
              <div className="flex items-center gap-10">
                <div>
                  <p className="text-4xl font-bold gold-text">50K+</p>
                  <p className="text-gray-400">Happy Customers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold gold-text">₹500Cr+</p>
                  <p className="text-gray-400">Loans Disbursed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold gold-text">4.9★</p>
                  <p className="text-gray-400">Customer Rating</p>
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
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Why Choose <span className="gold-text">InstaMoney</span></h2>
            <p className="text-xl text-gray-400">Experience the difference with our customer-first approach</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-3xl p-8 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all"
              >
                <div className="gold-gradient w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Categories Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Our <span className="gold-text">Loan Products</span></h2>
            <p className="text-xl text-gray-400">Choose the right loan for your needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanCategories.map((category, idx) => (
              <Link
                key={idx}
                href={category.href}
                className="glass-effect rounded-3xl p-8 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all group"
              >
                <div className="gold-gradient w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <category.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">{category.name}</h3>
                <p className="text-gray-400 mb-1">{category.line1}</p>
                <p className="text-gray-500 mb-4">{category.line2}</p>
                <div className="flex items-center text-amber-400 font-medium group-hover:gap-2 gap-1 transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">How It <span className="gold-text">Works</span></h2>
            <p className="text-xl text-gray-400">Simple 5-step process to get your loan</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="gold-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-black text-3xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full">
                    <ChevronRight className="h-8 w-8 text-amber-900/50 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">What Our <span className="gold-text">Customers Say</span></h2>
            <p className="text-xl text-gray-400">Hear from our happy customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass-effect rounded-3xl p-8 border border-amber-900/30">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-100">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Frequently Asked <span className="gold-text">Questions</span></h2>
            <p className="text-xl text-gray-400">Got questions? We've got answers</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-effect rounded-3xl p-12 border border-amber-900/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-6">Ready to Get Your <span className="gold-text">Loan</span>?</h2>
          <p className="text-xl text-gray-400 mb-8">Apply now and get instant approval</p>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="glass-effect rounded-2xl border border-amber-900/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-gray-100">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-amber-400" />
        ) : (
          <Plus className="h-5 w-5 text-amber-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-400">{answer}</div>
      )}
    </div>
  )
}
