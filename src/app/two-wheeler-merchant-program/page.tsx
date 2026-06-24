import Link from 'next/link'
import {
  ArrowRight,
  Bike,
  Building2,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

const corePillars = [
  {
    title: 'Financing',
    description: 'Business funding, supply chain finance, and emergency capital for growing two-wheeler showrooms.',
    icon: Wallet,
  },
  {
    title: 'Insurance',
    description: 'Issue policies from a unified dashboard and add more revenue to every showroom transaction.',
    icon: ShieldCheck,
  },
  {
    title: 'Digital Payments',
    description: 'Use QR codes, payment gateways, and merchant collection tools for faster collections.',
    icon: QrCode,
  },
  {
    title: 'Showroom Control',
    description: 'Bring loans, insurance, inventory support, and dealer workflows into one operating system.',
    icon: LayoutDashboard,
  },
]

const supplyChainPoints = [
  '90-120 day credit facilities for dealer stock purchases',
  'Dedicated credit limits for inventory buying cycles',
  'Multiple bank and NBFC options for better terms',
  'Better cash flow management without locking internal working capital',
]

const businessFunding = [
  {
    title: 'Instant Business Cash Credit And Working Capital',
    description: 'Check eligibility instantly through our API-integrated lender network, compare live offers, and choose what fits your dealership.',
    points: ['Up to Rs25 Crore support', 'Best available interest rate comparisons', 'Balance transfer and top-up options'],
  },
  {
    title: 'MSME / SME / CGTMSE Support',
    description: 'Access business-focused government-backed funding structures with guided support and simplified processing.',
    points: ['Instant eligibility checks', 'Government scheme assistance', 'Minimal documentation and faster workflows'],
  },
  {
    title: 'Emergency Business Funding',
    description: 'Get fast approval and disbursement when business cash flow needs urgent support.',
    points: ['Funding from Rs5 Lakhs to Rs3 Crore', 'Fast credit assessment', 'Target disbursement within 2 working days'],
  },
]

const customerSolutions = [
  {
    title: 'Digital Two Wheeler Loan Platform',
    description: 'Offer loan support directly from your showroom floor with instant customer eligibility checks and real-time lender offers.',
    points: [
      'Instant point-of-sale eligibility checks',
      'Multiple bank and NBFC offers compared in real time',
      'Fully digital flow with no physical paperwork',
      'Dedicated dealer portal with full application visibility',
    ],
  },
  {
    title: 'Dedicated Insurance Portal',
    description: 'Access major insurance providers in one unified workflow and issue policies on the spot.',
    points: [
      'All insurers in one place',
      'Instant policy issuance',
      'Wallet-based premium payments',
      'Higher payout opportunities for insurance issuance',
    ],
  },
]

const digitalOperations = [
  'Payment gateway for seamless online collections',
  'QR code and sound box support for faster in-store confirmations',
  'Merchant collection tools for receivables management',
  'Fresh loan, balance transfer, and top-up customer offerings',
  'Competitive loan against property and business loan options',
]

const erpFeatures = [
  'Billing and GST software',
  'Inventory management',
  'Dealer and distributor management',
  'Accounting and collections',
  'CRM and customer management',
  'Finance API integration',
]

const merchantBenefits = [
  'Grow sales by helping more customers finance their bikes instantly',
  'Increase revenue through financing, insurance, and payment solutions',
  'Build recurring income through renewals, referrals, and digital transactions',
  'Support modern showroom operations with a fully digital platform',
]

const merchantCategories = [
  'Automobile',
  'Electronics',
  'FMCG',
  'Cement',
  'TMT',
  'Medicine',
  'Furniture',
  'Education',
  'Mobile',
  'Other merchant categories',
]

export default function TwoWheelerMerchantProgramPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden pb-14 pt-16 lg:pb-18 lg:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-[#737780] hover:text-[#ff825c]">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,420px)] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff825c]/30 bg-[#ff825c]/10 px-4 py-2 text-sm text-[#ff825c]">
                <Bike className="h-4 w-4" />
                Two Wheeler Merchant Program
              </div>
              <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[50px] sm:leading-[1.05]">
                Grow your showroom business with financing, insurance, digital payments, and merchant tools from one platform.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-[#737780] sm:text-lg">
                Built for two-wheeler merchants who want more control over business funding, customer conversion, insurance issuance, and showroom collections without switching between separate systems.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact-us" className="tp-button-primary px-6 py-3.5">
                  Apply Now
                </Link>
                <Link href="/contact-us" className="tp-button-secondary px-6 py-3.5">
                  Talk To Our Team
                </Link>
              </div>
            </div>

            <div className="tp-card-muted p-6 sm:p-7">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Your Complete Business Growth Partner</p>
              <div className="space-y-4 text-sm leading-6 text-[#f5f5f5]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Business financing support up to Rs25 Crore across multiple use cases.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Digital customer loan assistance directly from the showroom floor.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Insurance portal and merchant payment tools from one dashboard.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                  <p>Dedicated support for dealer growth, recurring revenue, and smoother operations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Core Solutions</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Everything your showroom needs under one roof.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {corePillars.map((item) => (
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
          <div className="tp-card p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Supply Chain Finance</p>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                  Dealer purchase funding that keeps stock moving without straining working capital.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#737780]">
                  Connect your manufacturer network with national banks and NBFCs to set up 90-120 day credit facilities for showroom inventory buying cycles.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="space-y-4">
                  {supplyChainPoints.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Business Funding</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Working capital, government-backed support, and fast emergency business funding.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {businessFunding.map((item) => (
              <div key={item.title} className="tp-card p-7">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#737780]">{item.description}</p>
                <div className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p className="text-sm leading-6 text-[#f5f5f5]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Customer Solutions</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Financing and insurance flows that help more customers convert on the showroom floor.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {customerSolutions.map((item) => (
              <div key={item.title} className="tp-card p-8">
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#737780]">{item.description}</p>
                <div className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                      <p className="text-sm leading-6 text-[#f5f5f5]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="tp-card p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Digital Operations</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                Payment solutions and additional lending products for smoother daily operations.
              </h2>
              <div className="mt-6 space-y-3">
                {digitalOperations.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tp-card-muted p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Smart ERP And Dealer Management</p>
              <h3 className="text-2xl font-semibold text-white">Manage sales, finance, inventory, and collections from one platform.</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {erpFeatures.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="tp-card p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Why Merchants Choose This Program</p>
              <div className="space-y-4">
                {merchantBenefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ff825c]" />
                    <p className="text-sm leading-6 text-[#f5f5f5]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tp-card p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Also Available For</p>
              <div className="flex flex-wrap gap-3">
                {merchantCategories.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f5f5]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="tp-card-muted p-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#ff825c]">Become A Merchant Partner</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">One partner. Multiple revenue opportunities. Fully digital support.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#f5f5f5]">
              Expand financing, insurance, digital payments, and recurring merchant revenue streams from a dedicated showroom-focused platform.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact-us" className="tp-button-primary px-8 py-3.5">
                Apply Now
              </Link>
              <Link href="/contact-us" className="tp-button-secondary border-white/20 bg-black/35 px-8 py-3.5 text-white hover:border-[#ff825c] hover:bg-black/50">
                Talk To Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
