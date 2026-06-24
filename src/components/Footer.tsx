import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import BrandMark from './BrandMark'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandMark className="mb-5" />
            <p className="max-w-xs text-sm text-[#737780]">
              Kashless helps users apply, track, and manage online loan journeys with a clean, fast, implementation-ready interface.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-sm text-[#737780] hover:text-[#ff825c]">About Us</Link></li>
              <li><Link href="/contact-us" className="text-sm text-[#737780] hover:text-[#ff825c]">Contact Us</Link></li>
              <li><Link href="/user/login" className="text-sm text-[#737780] hover:text-[#ff825c]">Customer Login</Link></li>
              <li><Link href="/admin/login" className="text-sm text-[#737780] hover:text-[#ff825c]">Operator Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/personal-loan" className="text-sm text-[#737780] hover:text-[#ff825c]">Personal Loan</Link></li>
              <li><Link href="/home-loan" className="text-sm text-[#737780] hover:text-[#ff825c]">Home Loan</Link></li>
              <li><Link href="/loan-against-property" className="text-sm text-[#737780] hover:text-[#ff825c]">Loan Against Property</Link></li>
              <li><Link href="/emi-calculator" className="text-sm text-[#737780] hover:text-[#ff825c]">EMI Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Compliance</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-[#737780] hover:text-[#ff825c]">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-[#737780] hover:text-[#ff825c]">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-sm text-[#737780] hover:text-[#ff825c]">Refund Policy</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-[#737780] hover:text-[#ff825c]">Disclaimer</Link></li>
              <li><Link href="/grievance-redressal" className="text-sm text-[#737780] hover:text-[#ff825c]">Grievance Redressal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-[#737780]">
            © 2026 Kashless. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[#737780] hover:text-[#ff825c]">
              <ExternalLink className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#737780] hover:text-[#ff825c]">
              <ExternalLink className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#737780] hover:text-[#ff825c]">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
