'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bike,
  Building,
  Store,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileClock,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Minus,
  Plus,
  ShieldCheck,
  UserRoundCheck,
  Wallet,
} from 'lucide-react'
import LoanForm from '@/components/LoanForm'

const primaryActions = [
  { label: 'Apply Now', href: '/contact-us' },
  { label: 'Check Eligibility', href: '/contact-us' },
]

const platformHighlights = [
  {
    icon: LayoutDashboard,
    title: 'Quick Approval',
    description: 'Apply in minutes with a simple process designed for faster credit decisions.',
  },
  {
    icon: ShieldCheck,
    title: 'Digital Process',
    description: 'Complete your loan journey online with clear updates at every stage.',
  },
  {
    icon: FileClock,
    title: 'Secure And Transparent',
    description: 'Your information stays protected while fees, terms, and progress remain easy to understand.',
  },
]

const productCards = [
  {
    name: 'Personal Loan',
    href: '/personal-loan',
    icon: Wallet,
    description: 'Manage urgent expenses, travel plans, education needs, or family goals with fast personal funding.',
  },
  {
    name: 'Home Loan',
    href: '/home-loan',
    icon: Building,
    description: 'Own your dream home with attractive rates, clear repayments, and guided support from start to finish.',
  },
  {
    name: 'Payday Loan',
    href: '/payday-loan',
    icon: IndianRupee,
    description: 'Handle short-term cash needs before salary day with a quick and convenient online application.',
  },
  {
    name: 'Merchant Loan - Working Capital',
    href: '/loan-products#merchant-loan-working-capital',
    icon: Store,
    description: 'Unsecured working capital for retailers and nano MSMEs with digital onboarding and flexible repayments.',
  },
  {
    name: 'MSME Secured Loan (Up to 5L)',
    href: '/loan-products#msme-secured-loan',
    icon: Building,
    description: 'Property-backed MSME funding for business expansion and working capital with longer tenure options.',
  },
  {
    name: 'Two Wheeler Merchant Program',
    href: '/two-wheeler-merchant-program',
    icon: Bike,
    description: 'Integrated financing, insurance, and digital payment ecosystem built for two-wheeler showrooms.',
  },
]

const merchantLoanHighlights = [
  { label: 'Min Amount', value: 'Rs25K' },
  { label: 'Max Amount', value: 'Rs2.0L' },
  { label: 'Tenure', value: '3 - 18 months' },
  { label: 'Interest Rate', value: '18% - 36% p.a.' },
]

const merchantLoanInfo = [
  { label: 'Repayment Mode', value: 'ENach / UPI Mandate' },
  { label: 'Frequency', value: 'Daily / Weekly / Monthly' },
  { label: 'Coverage', value: 'Pan India' },
  { label: 'Target Market', value: 'Retailers and nano MSMEs seeking working capital to scale their businesses' },
]

const merchantEligibility = [
  'Age: 21 - 57 years',
  'Business type: Nano MSMEs and small merchants',
  'Digital KYC through Aadhaar XML or DigiLocker',
  'Bank account linked with UPI QR code accepting payments',
  'Cooling period of 3 days between loan applications',
]

const merchantDocuments = [
  'PAN Card',
  'Aadhaar Card',
  'Bank statements for 6 months or UPI transaction history',
  'Address proof',
  'Passport size photo',
]

const merchantBenefits = [
  'Quick disbursement in 24-48 hours',
  'Minimal documentation',
  'No collateral required',
  'Flexible repayment options',
  '100% digital process',
  'Easy top-up facility',
  'Transparent pricing',
  'Dedicated support team',
]

const merchantSegments = [
  'Vegetable vendors',
  'Fish sellers',
  'Street vendors',
  'Kirana stores',
  'Tea stalls',
  'Small retailers',
  'Nano MSMEs with UPI',
]

const msmeSecuredHighlights = [
  { label: 'Min Amount', value: 'Rs2.0L' },
  { label: 'Max Amount', value: 'Rs5.0L' },
  { label: 'Tenure', value: '12 - 84 months' },
  { label: 'Interest Rate', value: '19% - 24% p.a.' },
]

const msmeSecuredInfo = [
  { label: 'Partner', value: 'DIGI-LOANS MSME Partner' },
  { label: 'Partner Limit', value: 'Rs1 Cr per partner' },
  { label: 'Repayment Mode', value: 'NACH / Cheque / Cash / Online' },
  { label: 'Coverage', value: 'Pan India in approved pin codes' },
]

const msmeSecuredEligibility = [
  'Age: 21 - 60 years',
  'Business type: SENP / SEP / Govt employees / private sector',
  'KYC, income proof, property documents, and PD visit report required',
  'Property must have four-wheeler access and be within approved pin codes',
]

const msmeSecuredDocuments = [
  'PAN Card',
  'Aadhaar Card',
  'Bank statements for 6 months or UPI transaction history',
  'Address proof',
  'Passport size photo',
  'Income proof and property documents',
]

const msmeSecuredBenefits = [
  'Quick disbursement in 24-48 hours',
  'Longer tenure for manageable EMIs',
  'Structured documentation support',
  'Monthly repayment cycle',
  'Business expansion and working capital use cases',
  'Transparent pricing',
]

const twoWheelerMerchantFeatures = [
  'Business financing support up to Rs25 Crore for working capital, supply chain, and emergency needs',
  'Digital two-wheeler customer loan platform directly from the showroom floor',
  'Insurance portal with instant policy issuance from major providers',
  'QR codes, payment gateway, and merchant collection tools for daily operations',
]

const twoWheelerMerchantBenefits = [
  'Supply chain finance with 90-120 day dealer purchase support',
  'Instant business eligibility checks through lender integrations',
  'Dedicated dealer portal for visibility across loans, insurance, and operations',
]

const checkoutFinanceCategories = [
  {
    title: 'Education',
    targets: 'Schools, colleges, coaching centers, edtech businesses, and training institutes',
    products: 'School fees EMI, tuition finance, education loan, and admission finance',
  },
  {
    title: 'Healthcare',
    targets: 'Hospitals, clinics, pathology labs, diagnostic centers, dental clinics, and IVF centers',
    products: 'Patient bill EMI, medical equipment finance, diagnostic test EMI, and surgery finance',
  },
  {
    title: 'Electronics And Mobile',
    targets: 'Mobile dealers, electronics retailers, laptop dealers, and gadget stores',
    products: 'Consumer durable loans, mobile EMI, and gadget finance',
  },
  {
    title: 'Furniture And Home',
    targets: 'Furniture showrooms, modular kitchen dealers, and appliance stores',
    products: 'Furniture EMI, appliance finance, and home upgrade finance',
  },
  {
    title: 'Automobile And EV',
    targets: 'EV 2W and 3W dealers, battery dealers, auto parts, and charging infrastructure merchants',
    products: 'EV loan, battery finance, dealer working capital, and inventory finance',
  },
  {
    title: 'Building Material',
    targets: 'Cement dealers, TMT bar dealers, paint dealers, tiles and sanitary, and hardware distributors',
    products: 'Dealer finance, retailer finance, and working capital loans',
  },
]

const highPotentialVerticals = [
  'EV ecosystem: charging stations, lithium battery, and solar plus EV hybrid',
  'Solar: panel dealers, EPC companies, and distributors',
  'Healthcare expansion: multi-specialty hospitals, diagnostic chains, and pharma distributors',
  'Agriculture and rural: agri equipment, fertilizer, and seed companies',
  'FMCG distribution: super stockists and wholesale distribution chains',
  'Logistics and transport: fleet owners, truck aggregators, and transport companies',
  'Pharma distribution: medicine distributors and surgical equipment',
  'Education technology: online coaching and digital learning centers',
  'Hospitality and lifestyle: gym chains, wellness brands, and salon franchises',
  'Renewable energy: solar battery, inverter dealers, and green energy OEMs',
]

const workflow = [
  { step: '01', title: 'Apply Online', description: 'Fill in your details and choose the loan product that fits your requirement.' },
  { step: '02', title: 'Verify Documents', description: 'Upload basic documents online so our team can review your application quickly.' },
  { step: '03', title: 'Get Approval', description: 'Receive a faster decision with clear communication on eligibility and next steps.' },
  { step: '04', title: 'Receive Funds', description: 'Approved amounts are processed quickly so you can move ahead without delay.' },
]

const dashboardStats = [
  {
    label: 'Fast Digital Journey',
    value: '100%',
    detail: 'Apply, submit details, and track your loan process online',
  },
  {
    label: 'Easy Documentation',
    value: 'Less Paperwork',
    detail: 'Keep the process simple with a streamlined set of required details',
  },
  {
    label: 'Flexible Loan Options',
    value: 'Multiple Products',
    detail: 'Choose from personal, home, vehicle, payday, and business-focused funding',
  },
  {
    label: 'Clear Support',
    value: 'Guided Assistance',
    detail: 'Stay informed with transparent updates from application to disbursal',
  },
]

const faqs = [
  {
    question: 'What documents are usually required for a loan?',
    answer: 'Basic KYC, income proof, and bank statement details are commonly required depending on the loan type.',
  },
  {
    question: 'How long does loan approval usually take?',
    answer: 'Approval timelines can vary by product, but our digital process is built to keep decisions fast and communication clear.',
  },
  {
    question: 'Can I apply online without visiting a branch?',
    answer: 'Yes, Kashless is built around a fully online journey so you can apply, submit details, and track updates digitally.',
  },
  {
    question: 'Which loan options are available on Kashless?',
    answer: 'You can explore personal loans, home loans, payday loans, loan against property, and other financial solutions based on your needs.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden pb-10 pt-16 lg:pb-14 lg:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,460px)]">
            <div className="pt-4">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff825c]/30 bg-[#ff825c]/10 px-4 py-2 text-sm text-[#ff825c]">
                <ShieldCheck className="h-4 w-4" />
                Fast and hassle-free loan journey
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[50px] sm:leading-[1.05]">
                Fast and reliable loans for every need.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-[#737780] sm:text-lg">
                Personal Loan, Home Loan, Loan Against Property, Payday Loan, Vehicle Loan, and business-focused funding solutions through a smooth digital process.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.label === 'Apply Online'
                        ? 'tp-button-primary px-6 py-3.5'
                        : 'tp-button-secondary px-6 py-3.5'
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="tp-card px-5 py-5">
                    <p className="text-sm text-[#737780]">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-[#737780]">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="tp-card p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#ff825c]">Why Borrowers Choose Kashless</p>
                  <div className="space-y-3 text-sm leading-6 text-[#f5f5f5]">
                    <p>Quick online applications with less paperwork and faster response times.</p>
                    <p>Multiple loan options designed for salaried, self-employed, and business needs.</p>
                    <p>Clear communication from application to approval so you always know what comes next.</p>
                  </div>
                </div>
                <div className="tp-card p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#ff825c]">What You Can Expect</p>
                  <div className="space-y-3 text-sm leading-6 text-[#737780]">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>Simple online application flow</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>Transparent updates and support</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>Loan products for personal and business goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <LoanForm />
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card-muted p-8 sm:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Merchant Checkout Finance</p>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Onboard merchants and power checkout finance across high-conversion categories.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#f5f5f5]">
                  Built for Rs2 Cr+ turnover merchants offering 3-12 month EMI, no-cost EMI, cardless EMI, QR EMI, BNPL, and instant digital loan journeys from one business platform.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-[#f5f5f5]">
                <p className="font-medium text-white">Core Stack</p>
                <p className="mt-2">Financing, insurance, digital payments, and merchant growth support in one workflow.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {checkoutFinanceCategories.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#ff825c]">Targets</p>
                  <p className="mt-2 text-sm leading-6 text-[#f5f5f5]">{item.targets}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#ff825c]">Products</p>
                  <p className="mt-2 text-sm leading-6 text-[#737780]">{item.products}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#ff825c]">High-Potential Verticals</p>
                <h3 className="text-2xl font-semibold text-white">10 additional sectors with strong growth potential.</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {highPotentialVerticals.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#ff825c]">Why This Section Matters</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p className="text-sm leading-6 text-[#f5f5f5]">Opens merchant onboarding opportunities across education, healthcare, retail, home, EV, and building material categories.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p className="text-sm leading-6 text-[#f5f5f5]">Supports checkout-led products like EMI, BNPL, QR EMI, and instant digital finance.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p className="text-sm leading-6 text-[#f5f5f5]">Helps merchants unlock financing, insurance, and payment-led revenue from one platform.</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact-us" className="tp-button-primary px-6 py-3.5">
                    Onboard Merchants
                  </Link>
                  <Link href="/contact-us" className="tp-button-secondary border-white/20 bg-black/20 px-6 py-3.5 text-white hover:border-[#ff825c] hover:bg-black/35">
                    Explore Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="merchant-loan-working-capital" className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Why Choose Kashless</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              A simpler way to access credit with confidence.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {platformHighlights.map((item) => (
              <div key={item.title} className="tp-card p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff825c] text-[#171717]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#737780]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card-muted p-8 sm:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Featured Business Product</p>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff825c]/30 bg-black/20 px-4 py-2 text-sm text-[#f5f5f5]">
                  <Store className="h-4 w-4 text-[#ff825c]" />
                  Merchant Loan - Working Capital
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Unsecured working capital built for retailers and nano MSMEs.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f5f5f5]">
                  Designed for merchants who need quick access to business funds, this product supports inventory, day-to-day operations, and business growth with a fully digital process.
                </p>
              </div>
              <div className="rounded-2xl border border-[#ff825c]/20 bg-black/20 px-5 py-4 text-sm text-[#f5f5f5]">
                <p className="font-medium text-white">Processing Fee</p>
                <p className="mt-1">1% - 3% of loan amount (+ GST)</p>
                <p className="mt-2 text-xs text-[#737780]">Processing fee is deducted from the disbursement amount.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {merchantLoanHighlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-[#737780]">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {merchantLoanInfo.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-[#737780]">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#f5f5f5]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Eligible Merchant Segments</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {merchantSegments.map((segment) => (
                    <span key={segment} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f5f5]">
                      {segment}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 lg:col-span-1">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Eligibility Criteria</p>
                <div className="mt-4 space-y-3">
                  {merchantEligibility.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f5f5f5]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 lg:col-span-1">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Required Documents</p>
                <div className="mt-4 space-y-3">
                  {merchantDocuments.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f5f5f5]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 lg:col-span-1">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Features And Benefits</p>
                <div className="mt-4 space-y-3">
                  {merchantBenefits.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f5f5f5]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact-us" className="tp-button-primary px-6 py-3.5">
                Apply For Merchant Loan
              </Link>
              <Link href="/contact-us" className="tp-button-secondary border-white/20 bg-black/20 px-6 py-3.5 text-white hover:border-[#ff825c] hover:bg-black/35">
                Talk To Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="msme-secured-loan" className="tp-section pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card p-8 sm:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Featured Secured Business Product</p>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff825c]/20 bg-[#ff825c]/10 px-4 py-2 text-sm text-[#f5f5f5]">
                  <Building className="h-4 w-4 text-[#ff825c]" />
                  MSME Secured Loan (Up to 5L)
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Property-backed MSME funding for business expansion and working capital.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#737780]">
                  Built for small businesses and eligible salaried or self-employed applicants, this secured product combines higher ticket size, longer tenure, and monthly repayment flexibility.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-sm text-[#f5f5f5]">
                <p className="font-medium text-white">Processing Fee</p>
                <p className="mt-1">2% of loan amount (+ GST)</p>
                <p className="mt-2 text-xs text-[#737780]">Processing fee is deducted from the disbursement amount.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {msmeSecuredHighlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <p className="text-sm text-[#737780]">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {msmeSecuredInfo.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                    <p className="text-sm text-[#737780]">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#f5f5f5]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Product Snapshot</p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-[#f5f5f5]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p>Collateral: Residential or commercial property</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p>Frequency: Monthly</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p>Loan purpose: Business expansion or working capital</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p>Target market: SENP, SEP, and eligible government or private employees</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Eligibility Criteria</p>
                <div className="mt-4 space-y-3">
                  {msmeSecuredEligibility.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f5f5f5]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Required Documents</p>
                <div className="mt-4 space-y-3">
                  {msmeSecuredDocuments.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f5f5f5]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Features And Benefits</p>
                <div className="mt-4 space-y-3">
                  {msmeSecuredBenefits.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f5f5f5]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact-us" className="tp-button-primary px-6 py-3.5">
                Apply For MSME Secured Loan
              </Link>
              <Link href="/contact-us" className="tp-button-secondary px-6 py-3.5">
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Featured Merchant Program</p>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff825c]/20 bg-[#ff825c]/10 px-4 py-2 text-sm text-[#f5f5f5]">
                  <Bike className="h-4 w-4 text-[#ff825c]" />
                  Two Wheeler Merchant Program
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Grow your showroom with financing, insurance, and digital payments from one platform.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#737780]">
                  Built for two-wheeler merchants who want stronger customer conversion, smarter inventory funding, faster insurance issuance, and cleaner payment operations without juggling multiple systems.
                </p>
                <div className="mt-6 space-y-3">
                  {twoWheelerMerchantFeatures.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tp-card-muted p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#ff825c]">Why It Stands Out</p>
                <div className="mt-4 space-y-4">
                  {twoWheelerMerchantBenefits.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/two-wheeler-merchant-program" className="tp-button-primary px-6 py-3.5">
                    Explore Program
                  </Link>
                  <Link href="/contact-us" className="tp-button-secondary border-white/20 bg-black/20 px-6 py-3.5 text-white hover:border-[#ff825c] hover:bg-black/35">
                    Talk To Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Our Loan Products</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Choose the loan that matches your requirement.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#737780]">
              Explore trusted funding options designed for salaried professionals, self-employed borrowers, and growing businesses.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {productCards.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="tp-card group flex h-full flex-col p-7 hover:border-[#ff825c]/40"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/6 text-[#ff825c]">
                  <product.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#737780]">{product.description}</p>
                <div className="mt-6 flex items-center gap-2 font-medium text-[#ff825c]">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">How It Works</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              A quick 4-step process to move from application to disbursal.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step, idx) => (
              <div key={step.step} className="tp-card relative p-6">
                <div className="mb-5 inline-flex rounded-full border border-[#ff825c]/35 bg-[#ff825c]/10 px-3 py-1 text-sm font-medium text-[#ff825c]">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#737780]">{step.description}</p>
                {idx < workflow.length - 1 && (
                  <div className="pointer-events-none absolute right-4 top-6 hidden xl:block text-[#737780]">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="tp-card p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Kashless At A Glance</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">Numbers that reflect trust, speed, and borrower confidence.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {dashboardStats.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/3 p-5">
                    <p className="text-sm text-[#737780]">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-[#737780]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="tp-card-muted p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">What Borrowers Value</p>
              <h3 className="text-2xl font-semibold text-white">A smooth experience matters just as much as fast approval.</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <UserRoundCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ff825c]" />
                  <p className="text-sm leading-6 text-[#f5f5f5]">
                    Clear communication helps borrowers understand what happens next and how soon they can move forward.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff825c]" />
                  <p className="text-sm leading-6 text-[#f5f5f5]">
                    Transparent loan options make it easier to choose the right product without confusion.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#ff825c]" />
                  <p className="text-sm leading-6 text-[#f5f5f5]">
                    Timely updates give applicants confidence throughout approval, verification, and disbursal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Frequently Asked Questions</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Got questions? We’ve got answers.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card-muted p-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Ready To Get Started?</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Apply now and move one step closer to the funds you need.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#f5f5f5]">
              Start your application online and let our team guide you through a smooth and reliable loan journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact-us" className="tp-button-primary px-8 py-3.5">
                Apply Now
              </Link>
              <Link href="/contact-us" className="tp-button-secondary border-white/20 bg-black/35 px-8 py-3.5 text-white hover:border-[#ff825c] hover:bg-black/50">
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="tp-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="pr-4 font-semibold text-white">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-[#ff825c]" />
        ) : (
          <Plus className="h-5 w-5 text-[#ff825c]" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm leading-6 text-[#737780]">{answer}</div>
      )}
    </div>
  )
}
