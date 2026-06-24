import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Landmark,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Store,
  TrendingUp,
  Wallet,
} from 'lucide-react'

const overviewCards = [
  {
    title: 'Higher Loan Limits',
    description: 'Unlock large-ticket funding to support bigger orders, stronger inventory positions, and faster growth.',
    icon: TrendingUp,
  },
  {
    title: 'Emergency Funding',
    description: 'Access fast business capital from Rs5 Lakhs to Rs3 Cr when cash flow urgency hits.',
    icon: Wallet,
  },
  {
    title: 'Ready For Your Category',
    description: 'Built for electronics, FMCG, cement, paint, tyre, and other merchant-led businesses.',
    icon: Package,
  },
  {
    title: 'One Platform, More Control',
    description: 'Manage financing, insurance, payments, and growth solutions from a single dashboard.',
    icon: LayoutDashboard,
  },
]

const chapterCards = [
  {
    id: 'electronics-program',
    title: 'Electronics Partner Program',
    summary:
      'Turn more walk-ins into buyers with fast EMI and financing at the counter to increase order values and improve checkout conversions.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    solutions: [
      {
        title: 'Consumer Durable EMI',
        description:
          'Instant financing from Rs25,000 to Rs10 Lakhs for TVs, ACs, refrigerators, mobiles, laptops, and more.',
      },
      {
        title: 'Multiple Lenders',
        description: 'Improve approval chances with access to a broader lender network.',
      },
      {
        title: 'Instant Settlement',
        description: 'Receive merchant payouts the same day with no waiting cycle.',
      },
      {
        title: 'Embedded Insurance',
        description: 'Increase checkout value with warranty and protection plan bundles.',
      },
      {
        title: 'Supply Chain Finance',
        description: 'Support distributors and retailers with funding from Rs5 Lakhs to Rs25 Cr and 90-120 day credit limits.',
      },
      {
        title: 'Emergency Funding',
        description: 'Access urgent capital in as little as 2 working days with limits up to Rs3 Cr.',
      },
    ],
  },
  {
    id: 'fmcg-program',
    title: 'FMCG Distribution Program',
    summary:
      'Keep inventory moving, cash flowing, and distributors growing with funding tools and a single partner workflow.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80',
    solutions: [
      {
        title: 'Supply Chain Finance',
        description: 'Fund distributors and retailers from Rs5 Lakhs to Rs25 Cr with a 90-120 day credit limit.',
      },
      {
        title: 'Credit Line For Inventory',
        description: 'Use Cash Credit and Overdraft support to handle seasonal demand and stock up confidently.',
      },
      {
        title: 'MSME And CGTMSE Support',
        description: 'Access government-backed structures with faster processing and funding up to Rs10 Cr.',
      },
      {
        title: 'Emergency Funding',
        description: 'Get critical capital in as little as 2 working days when urgency hits.',
      },
      {
        title: 'LAP Up To Rs25 Cr',
        description: 'Unlock larger business growth with loan against property financing.',
      },
      {
        title: 'Cash Credit / Term Loan',
        description: 'Apply once and receive competitive offers from leading banks and NBFCs.',
      },
    ],
  },
  {
    id: 'cement-program',
    title: 'Cement Dealer Program',
    summary:
      'Expand inventory, speed up sales, and protect cash flow with manufacturer-aligned funding and a multi-bank credit network.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    solutions: [
      {
        title: 'Digital Merchant Portal',
        description: 'Manage applications, approvals, and updates from one streamlined place.',
      },
      {
        title: 'QR And Sound Box Support',
        description: 'Enable faster, more reliable digital payments at dealer counters.',
      },
      {
        title: 'Supply Chain Finance',
        description: 'Fund distributors and retailers from Rs5 Lakhs to Rs25 Cr with 90-120 day credit limits.',
      },
      {
        title: 'Credit Line For Inventory',
        description: 'Use flexible Cash Credit and Overdraft support to manage demand cycles.',
      },
      {
        title: 'MSME And CGTMSE Support',
        description: 'Access government-backed credit support with faster processing.',
      },
      {
        title: 'Cash Credit / Term Loan',
        description: 'Receive competitive funding options from national and private lenders.',
      },
    ],
  },
  {
    id: 'paint-program',
    title: 'Paint Dealer Program',
    summary:
      'Keep shelves stocked, improve collections, and convert more customers with financing and payment support built for dealer networks.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=80',
    solutions: [
      {
        title: 'Stock Purchase Finance',
        description: 'Run instant eligibility checks and access working capital to maintain inventory levels.',
      },
      {
        title: 'Supply Chain Finance',
        description: 'Fund distributors and retailers from Rs5 Lakhs to Rs25 Cr with 90-120 day credit windows.',
      },
      {
        title: 'Customer EMI Options',
        description: 'Offer buy-now-pay-later options on larger orders to improve conversion.',
      },
      {
        title: 'Digital Payment Ecosystem',
        description: 'Deploy QR codes, collection tools, and a dedicated support portal.',
      },
      {
        title: 'Credit Line For Inventory',
        description: 'Use Cash Credit and Overdraft support to manage seasonal spikes.',
      },
      {
        title: 'Emergency Funding',
        description: 'Access urgent business capital quickly when working capital pressure rises.',
      },
    ],
  },
  {
    id: 'tyre-program',
    title: 'Tyre Dealer Program',
    summary:
      'Help tyre dealers stock more, sell faster, and grow confidently with inventory finance, EMI options, and protection products.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=80',
    solutions: [
      {
        title: 'Inventory Finance And Credit Line',
        description: 'Stock more tyres with flexible credit lines tailored for dealer demand.',
      },
      {
        title: 'Supply Chain Finance',
        description: 'Fund your supply chain from Rs5 Lakhs to Rs25 Cr with 90-120 day limits.',
      },
      {
        title: 'Customer EMI Programs',
        description: 'Help customers buy today with easy monthly instalments at checkout.',
      },
      {
        title: 'Multiple Lender Network',
        description: 'Reach banks and NBFCs to improve approval rates for more customers.',
      },
      {
        title: 'Emergency Funding Support',
        description: 'Get urgent capital up to Rs3 Cr within 2 working days when business needs it most.',
      },
      {
        title: 'Digital Merchant Portal',
        description: 'Manage loans, payouts, and insurance from one dashboard.',
      },
    ],
  },
]

const governmentSchemes = [
  {
    title: 'CGTMSE',
    description: 'Collateral-backed or guarantee-assisted MSME structures with support for eligible businesses up to Rs2 Cr.',
    icon: ShieldCheck,
  },
  {
    title: 'MSME Loans',
    description: 'Subsidised and priority-oriented lending structures for registered micro, small, and medium enterprises.',
    icon: Building2,
  },
  {
    title: 'SME Finance',
    description: 'Working capital and term loan structures tailored for growing small and medium businesses.',
    icon: Landmark,
  },
  {
    title: 'Startup Support',
    description: 'Faster KYC, lighter documentation, and founder-friendly business funding journeys where applicable.',
    icon: TrendingUp,
  },
]

const otherCategorySolutions = [
  'Business loan up to Rs25 Cr across term loan, OD, and CC facilities',
  'Supply chain finance for distributors and retailers from Rs5 Lakhs to Rs25 Cr',
  'Consumer EMI to drive more sales at checkout',
  'Payments with QR code, payment gateway, and sound box support',
  'Merchant dashboard for tracking loans, insurance, and payouts',
  'Loan against property up to Rs25 Cr for larger growth plans',
]

const onboardingSteps = [
  {
    step: '01',
    title: 'Choose Your Category',
    description: 'Electronics, FMCG, Cement, Paint, Tyre, or another merchant-led business line.',
  },
  {
    step: '02',
    title: 'Onboard To The Portal',
    description: 'Quick KYC, minimal documentation, and guided support from the onboarding team.',
  },
  {
    step: '03',
    title: 'Access Products Instantly',
    description: 'Financing, EMI, insurance, and payment tools go live from day one.',
  },
  {
    step: '04',
    title: 'Grow Your Business',
    description: 'Improve conversions, manage cash flow better, and expand with more control.',
  },
]

export default function LoanProductsPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden pb-14 pt-16 lg:pb-18 lg:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-[#737780] hover:text-[#ff825c]">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,420px)] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff825c]/30 bg-[#ff825c]/10 px-4 py-2 text-sm text-[#ff825c]">
                <Store className="h-4 w-4" />
                Loan Products
              </div>
              <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[50px] sm:leading-[1.05]">
                One platform. Multiple categories. Financing, insurance, payments, and growth solutions for Indian merchants and distributors.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-[#737780] sm:text-lg">
                Kashless supports category-led merchant programs with higher limits, emergency funding, payment tools, and business growth workflows built for operational speed.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact-us" className="tp-button-primary px-6 py-3.5">
                  Apply Now
                </Link>
                <Link href="/contact-us" className="tp-button-secondary px-6 py-3.5">
                  Partner Program Guide
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewCards.map((item) => (
                  <div key={item.title} className="tp-card p-5">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff825c] text-[#171717]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#737780]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tp-card-muted p-6 sm:p-7">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Power Your Business With Kashless</p>
              <div className="space-y-4 text-sm leading-6 text-[#f5f5f5]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Higher loan limits for inventory, supply chain, and business expansion.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Emergency funding from Rs5 Lakhs to Rs3 Cr when cash flow needs urgency.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Category-specific tools for electronics, FMCG, cement, paint, tyre, and more.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Centralized control for financing, insurance, payments, and merchant operations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Partner Programs</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Category-specific programs built for dealer, distributor, and merchant growth.
            </h2>
          </div>

          <div className="space-y-8">
            {chapterCards.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className="tp-card overflow-hidden"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                  <div className="p-7 sm:p-8">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{chapter.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#737780]">{chapter.summary}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {chapter.solutions.slice(0, 4).map((item) => (
                        <div key={item.title} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-[#737780]">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 lg:border-l lg:border-t-0">
                    {chapter.image ? (
                      <div
                        className="min-h-[280px] h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.18)), url('${chapter.image}')`,
                        }}
                      />
                    ) : (
                      <div className="flex h-full min-h-[280px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,130,92,0.16),transparent_18rem)] p-8">
                        <div className="w-full rounded-3xl border border-white/10 bg-black/25 p-6">
                          <p className="text-sm uppercase tracking-[0.16em] text-[#ff825c]">Key Solutions</p>
                          <div className="mt-4 space-y-3">
                            {chapter.solutions.slice(4).map((item) => (
                              <div key={item.title} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                                <div>
                                  <p className="font-medium text-white">{item.title}</p>
                                  <p className="text-sm leading-6 text-[#737780]">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {chapter.image && (
                  <div className="border-t border-white/10 p-7 sm:p-8">
                    <div className="grid gap-3 md:grid-cols-2">
                      {chapter.solutions.slice(4).map((item) => (
                        <div key={item.title} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-[#737780]">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Government Schemes</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Government-backed credit access across eligible business categories.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {governmentSchemes.map((scheme) => (
              <div key={scheme.title} className="tp-card p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff825c] text-[#171717]">
                  <scheme.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{scheme.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#737780]">{scheme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="tp-card p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Other Category Merchant Program</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                Financing, insurance, payments, and growth solutions for more business categories.
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {otherCategorySolutions.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tp-card-muted p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Single Dashboard</p>
              <h3 className="text-2xl font-semibold text-white">One partner. Multiple revenue streams.</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#ff825c]" />
                  <p className="text-sm leading-6 text-[#f5f5f5]">Drive financing, EMI, insurance, and digital payment adoption from one place.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[#ff825c]" />
                  <p className="text-sm leading-6 text-[#f5f5f5]">Access national banks, private lenders, and eligible government-backed structures through one workflow.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Store className="mt-0.5 h-5 w-5 shrink-0 text-[#ff825c]" />
                  <p className="text-sm leading-6 text-[#f5f5f5]">Support trade, retail, and merchant-led business models without switching systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card-muted p-8 sm:p-10">
            <div className="mb-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">How It Works</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                One platform. Clear onboarding. Faster business growth.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {onboardingSteps.map((step) => (
                <div key={step.step} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="mb-4 inline-flex rounded-full border border-[#ff825c]/35 bg-[#ff825c]/10 px-3 py-1 text-sm font-medium text-[#ff825c]">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#f5f5f5]">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact-us" className="tp-button-primary px-8 py-3.5">
                Become A Partner
              </Link>
              <Link href="/contact-us" className="tp-button-secondary border-white/20 bg-black/25 px-8 py-3.5 text-white hover:border-[#ff825c] hover:bg-black/40">
                Talk To Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
