'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap, Phone, ChevronDown, ChevronRight } from 'lucide-react'

const loanProducts = [
  { name: 'Personal Loan', href: '/personal-loan' },
  { name: 'Home Loan', href: '/home-loan' },
  { name: 'Loan Against Property', href: '/loan-against-property' },
  { name: 'Short Term Loan', href: '/short-term-loan' },
  { name: 'Payday Loan', href: '/payday-loan' },
  { name: 'Car Loan', href: '/car-loan' },
  { name: 'Two Wheeler Loan', href: '/two-wheeler-loan' },
  { name: 'Advance Salary', href: '/advance-salary' },
  { name: 'Invoice Finance', href: '/invoice-finance' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="gold-gradient p-2 rounded-xl">
              <Zap className="h-7 w-7 text-black" />
            </div>
            <span className="text-2xl font-bold gold-text">
              InstaMoney
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-200 hover:text-amber-300 font-medium transition-colors">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-gray-200 hover:text-amber-300 font-medium transition-colors"
              >
                Loan Products
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 glass-effect rounded-2xl shadow-2xl border border-amber-900/30 py-3 z-50">
                  {loanProducts.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block px-5 py-3 hover:bg-amber-900/30 text-gray-200 hover:text-amber-300 transition-all"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about-us" className="text-gray-200 hover:text-amber-300 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact-us" className="text-gray-200 hover:text-amber-300 font-medium transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="tel:+911234567890" className="flex items-center gap-2 text-gray-300 hover:text-amber-300">
              <Phone className="h-4 w-4" />
              <span className="font-medium">+91 123 456 7890</span>
            </Link>
            <Link
              href="/contact-us"
              className="gold-gradient text-black px-6 py-2.5 rounded-full font-semibold hover:shadow-xl hover:shadow-amber-500/40 transition-all"
            >
              Apply Now
            </Link>
          </div>

          <button
            className="md:hidden text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-amber-900/30">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/"
              className="block text-lg font-medium text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="w-full flex items-center justify-between text-lg font-medium text-gray-200 py-2"
              >
                <span>Loan Products</span>
                <ChevronRight className={`h-5 w-5 transition-transform ${isMobileDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {isMobileDropdownOpen && (
                <div className="pl-4 space-y-1 border-l-2 border-amber-900/30">
                  {loanProducts.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block px-4 py-3 text-gray-300 hover:text-amber-300 rounded-lg hover:bg-amber-900/20"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileDropdownOpen(false)
                      }}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about-us"
              className="block text-lg font-medium text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="block text-lg font-medium text-gray-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/contact-us"
              className="block w-full text-center gold-gradient text-black px-6 py-3 rounded-full font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
