'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { getCurrentUser, setCurrentUser, getCurrentAdminUser, setCurrentAdminUser, InstaUser, InstaAdminUser } from '@/lib/storage'

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
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false)
  const [currentUser, setCurrentUserState] = useState<InstaUser | null>(null)
  const [adminUser, setAdminUserState] = useState<InstaAdminUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  
  const isAdminRoute = pathname.startsWith('/admin')
  const isUserRoute = pathname.startsWith('/user')

  useEffect(() => {
    const user = getCurrentUser()
    if (user) setCurrentUserState(user)
    
    const admin = getCurrentAdminUser()
    if (admin) setAdminUserState(admin)
  }, [])

  const handleUserLogout = () => {
    setCurrentUser(null)
    setCurrentUserState(null)
    setIsUserDropdownOpen(false)
    router.push('/')
  }

  const handleAdminLogout = () => {
    setCurrentAdminUser(null)
    setAdminUserState(null)
    setIsAdminDropdownOpen(false)
    router.push('/admin/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/instamoney-logo.png" 
              alt="InstaMoney Logo" 
              className="h-16 sm:h-20"
            />
          </Link>

          {!isAdminRoute && (
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#050a14] hover:text-[#0052ff] font-medium transition-colors">
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-[#050a14] hover:text-[#0052ff] font-medium transition-colors"
                >
                  Loan Products
                  <ChevronRight className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#e5e7eb] rounded-2xl shadow-xl py-3 z-50">
                    {loanProducts.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="block px-6 py-3 text-[#050a14] hover:text-[#0052ff] hover:bg-[#f9fafb] transition-all"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/emi-calculator" className="text-[#050a14] hover:text-[#0052ff] font-medium transition-colors">
                EMI Calculator
              </Link>
              <Link href="/about-us" className="text-[#050a14] hover:text-[#0052ff] font-medium transition-colors">
                About Us
              </Link>
              <Link href="/contact-us" className="text-[#050a14] hover:text-[#0052ff] font-medium transition-colors">
                Contact Us
              </Link>
            </nav>
          )}

          <div className="hidden md:flex items-center gap-4">
            {isAdminRoute && adminUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
                >
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="font-medium text-gray-800">{adminUser.name}</span>
                </button>
                {isAdminDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#e5e7eb] rounded-xl shadow-xl py-3 z-50">
                    <Link
                      href="/admin"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleAdminLogout}
                      className="block w-full text-left px-6 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
                >
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="font-medium text-gray-800">{currentUser.name}</span>
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#e5e7eb] rounded-xl shadow-xl py-3 z-50">
                    <Link
                      href="/user/dashboard"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/user/profile"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleUserLogout}
                      className="block w-full text-left px-6 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : !isAdminRoute ? (
              <>
                <Link
                  href="/user/login"
                  className="text-[#050a14] hover:text-[#0052ff] font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/contact-us"
                  className="bg-[#0052ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#003ecf] transition-all"
                >
                  Apply Now
                </Link>
              </>
            ) : null}
          </div>

          <button
            className="md:hidden text-[#050a14]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e7eb]">
          <div className="px-4 py-6 space-y-4">
            {!isAdminRoute && (
              <>
                <Link
                  href="/"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>

                <div className="space-y-2">
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className="w-full flex items-center justify-between text-lg font-medium text-[#050a14] py-2"
                  >
                    <span>Loan Products</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${isMobileDropdownOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="pl-4 space-y-1 border-l border-[#e5e7eb]">
                      {loanProducts.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="block px-4 py-3 text-[#6b7280] hover:text-[#0052ff] hover:bg-[#f9fafb] rounded-xl"
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
                  href="/emi-calculator"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EMI Calculator
                </Link>

                <Link
                  href="/about-us"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact-us"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </>
            )}
            
            {isAdminRoute && adminUser ? (
              <>
                <Link
                  href="/admin"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="block w-full text-left text-lg font-medium text-red-600 py-2"
                >
                  Logout
                </button>
              </>
            ) : currentUser ? (
              <>
                <Link
                  href="/user/dashboard"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/user/profile"
                  className="block text-lg font-medium text-[#050a14] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleUserLogout}
                  className="block w-full text-left text-lg font-medium text-red-600 py-2"
                >
                  Logout
                </button>
              </>
            ) : !isAdminRoute ? (
              <Link
                href="/user/login"
                className="block text-lg font-medium text-[#050a14] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : null}

            {!isAdminRoute && !currentUser && (
              <Link
                href="/contact-us"
                className="block w-full text-center bg-[#0052ff] text-white px-6 py-3 rounded-full font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}