import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, ExternalLink, Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-amber-900/30 text-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="gold-gradient p-2 rounded-xl">
                <Zap className="h-7 w-7 text-black" />
              </div>
              <span className="text-2xl font-bold gold-text">InstaMoney</span>
            </div>
            <p className="text-gray-400 mb-6">
              Fast & Hassle-Free Loans for Every Need. Personal Loan, Home Loan, LAP, Payday Loan, Vehicle Loan & Business Financing Solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Star className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 gold-text">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-amber-300 transition-colors">Home</Link></li>
              <li><Link href="/about-us" className="text-gray-400 hover:text-amber-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact-us" className="text-gray-400 hover:text-amber-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 gold-text">Loan Products</h3>
            <ul className="space-y-3">
              <li><Link href="/personal-loan" className="text-gray-400 hover:text-amber-300 transition-colors">Personal Loan</Link></li>
              <li><Link href="/home-loan" className="text-gray-400 hover:text-amber-300 transition-colors">Home Loan</Link></li>
              <li><Link href="/loan-against-property" className="text-gray-400 hover:text-amber-300 transition-colors">Loan Against Property</Link></li>
              <li><Link href="/short-term-loan" className="text-gray-400 hover:text-amber-300 transition-colors">Short Term Loan</Link></li>
              <li><Link href="/car-loan" className="text-gray-400 hover:text-amber-300 transition-colors">Car Loan</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 gold-text">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-amber-400 mt-0.5" />
                <span className="text-gray-400">+91 123 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-400 mt-0.5" />
                <span className="text-gray-400">contact@instamoney.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5" />
                <span className="text-gray-400">123 Financial Hub, Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-900/30 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-amber-300 transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:text-amber-300 transition-colors">Disclaimer</Link>
              <Link href="/cookie-policy" className="hover:text-amber-300 transition-colors">Cookie Policy</Link>
              <Link href="/grievance-redressal" className="hover:text-amber-300 transition-colors">Grievance Redressal</Link>
              <Link href="/refund-policy" className="hover:text-amber-300 transition-colors">Refund Policy</Link>
            </div>
            <p className="text-sm text-gray-400 md:text-right">
              © 2026 InstaMoney. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
