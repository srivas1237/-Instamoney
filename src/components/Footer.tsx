import Link from 'next/link'
import { Zap, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#050a14] border-t border-[#1a2332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-[#0052ff] p-2 rounded-2xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                InstaMoney
              </span>
            </Link>
            <p className="text-[#9ca3af] text-sm">
              Fast & Hassle-Free Loans for Every Need
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-[#9ca3af] hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact-us" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/personal-loan" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Personal Loan</Link></li>
              <li><Link href="/home-loan" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Home Loan</Link></li>
            </ul>
          </div>

          {/* More Loans */}
          <div>
            <h4 className="text-white font-semibold mb-4">Loans</h4>
            <ul className="space-y-2">
              <li><Link href="/loan-against-property" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Loan Against Property</Link></li>
              <li><Link href="/car-loan" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Car Loan</Link></li>
              <li><Link href="/two-wheeler-loan" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Two Wheeler Loan</Link></li>
              <li><Link href="/invoice-finance" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Invoice Finance</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Disclaimer</Link></li>
              <li><Link href="/grievance-redressal" className="text-[#9ca3af] hover:text-white transition-colors text-sm">Grievance Redressal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#1a2332] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9ca3af] text-sm">
            © 2024 InstaMoney. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors">
              <ExternalLink className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors">
              <ExternalLink className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
