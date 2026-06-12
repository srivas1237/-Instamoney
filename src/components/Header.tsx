'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'

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
    <header className="sticky top-0 z-50 bg-[#050a14] border-b border-[#1a2332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#0052ff] p-2 rounded-2xl">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              InstaMoney
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors"
              >
                Loan Products
                <ChevronRight className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#101725] border border-[#1a2332] rounded-2xl shadow-xl py-3 z-50">
                  {loanProducts.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-[#1a2332] transition-all"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about-us" className="text-gray-300 hover:text-white font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact-us" className="text-gray-300 hover:text-white font-medium transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact-us"
              className="bg-[#0052ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#003ecf] transition-all"
            >
              Apply Now
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#050a14] border-t border-[#1a2332]">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/"
              className="block text-lg font-medium text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="w-full flex items-center justify-between text-lg font-medium text-white py-2"
              >
                <span>Loan Products</span>
                <ChevronRight className={`h-5 w-5 transition-transform ${isMobileDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {isMobileDropdownOpen && (
                <div className="pl-4 space-y-1 border-l border-[#1a2332]">
                  {loanProducts.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-[#101725] rounded-xl"
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
              className="block text-lg font-medium text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="block text-lg font-medium text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/contact-us"
              className="block w-full text-center bg-[#0052ff] text-white px-6 py-3 rounded-full font-semibold"
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
