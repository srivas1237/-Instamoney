'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { getCurrentUser, setCurrentUser, getCurrentAdminUser, setCurrentAdminUser, InstaUser, InstaAdminUser } from '@/lib/storage'
import BrandMark from './BrandMark'

const loanProducts = [
  { name: 'Loan Products Overview', href: '/loan-products' },
  { name: 'Personal Loan', href: '/personal-loan' },
  { name: 'Home Loan', href: '/home-loan' },
  { name: 'Loan Against Property', href: '/loan-against-property' },
  { name: 'Short Term Loan', href: '/short-term-loan' },
  { name: 'Payday Loan', href: '/payday-loan' },
  { name: 'Car Loan', href: '/car-loan' },
  { name: 'Two Wheeler Loan', href: '/two-wheeler-loan' },
  { name: 'Advance Salary', href: '/advance-salary' },
  { name: 'Invoice Finance', href: '/invoice-finance' },
  { name: 'Merchant Loan - Working Capital', href: '/loan-products#merchant-loan-working-capital' },
  { name: 'Two Wheeler Merchant Program', href: '/two-wheeler-merchant-program' },
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
  const isAdminLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUserState(user)
    
    if (isAdminLoginPage) {
      setAdminUserState(null)
      return
    }

    const admin = getCurrentAdminUser()
    setAdminUserState(admin)
  }, [pathname, isAdminLoginPage])

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[84px] items-center justify-between gap-4">
          <BrandMark compact />

          {!isAdminRoute && (
            <nav className="hidden items-center gap-7 md:flex">
              <Link href="/" className="text-sm font-medium text-white hover:text-[#ff825c]">
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#ff825c]"
                >
                  Loan Products
                  <ChevronRight className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full z-50 mt-3 w-72 rounded-xl border border-white/10 bg-[#121212] p-3 shadow-2xl">
                    {loanProducts.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="block rounded-lg px-4 py-3 text-sm text-white hover:bg-white/5 hover:text-[#ff825c]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/emi-calculator" className="text-sm font-medium text-white hover:text-[#ff825c]">
                EMI Calculator
              </Link>
              <Link href="/about-us" className="text-sm font-medium text-white hover:text-[#ff825c]">
                About Us
              </Link>
              <Link href="/contact-us" className="text-sm font-medium text-white hover:text-[#ff825c]">
                Contact Us
              </Link>
            </nav>
          )}

          <div className="hidden items-center gap-4 md:flex">
            {isAdminRoute && !isAdminLoginPage && adminUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white"
                >
                  <User className="h-5 w-5 text-[#ff825c]" />
                  <span className="font-medium">{adminUser.name}</span>
                </button>
                {isAdminDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-xl border border-white/10 bg-[#121212] py-3 shadow-2xl">
                    <Link
                      href="/admin"
                      className="block px-6 py-2 text-sm text-white hover:bg-white/5"
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <hr className="my-2 border-white/10" />
                    <button
                      onClick={handleAdminLogout}
                      className="block w-full px-6 py-2 text-left text-sm text-[#ff825c] hover:bg-white/5"
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
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white"
                >
                  <User className="h-5 w-5 text-[#ff825c]" />
                  <span className="font-medium">{currentUser.name}</span>
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-xl border border-white/10 bg-[#121212] py-3 shadow-2xl">
                    <Link
                      href="/user/dashboard"
                      className="block px-6 py-2 text-sm text-white hover:bg-white/5"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/user/profile"
                      className="block px-6 py-2 text-sm text-white hover:bg-white/5"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <hr className="my-2 border-white/10" />
                    <button
                      onClick={handleUserLogout}
                      className="block w-full px-6 py-2 text-left text-sm text-[#ff825c] hover:bg-white/5"
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
                  className="text-sm font-medium text-white hover:text-[#ff825c]"
                >
                  Login
                </Link>
                <Link
                  href="/contact-us"
                  className="tp-button-primary px-6 py-2.5 text-sm"
                >
                  Apply Online
                </Link>
              </>
            ) : null}
          </div>

          <button
            className="text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="px-4 py-6 space-y-4">
            {!isAdminRoute && (
              <>
                <Link
                  href="/"
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>

                <div className="space-y-2">
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className="flex w-full items-center justify-between py-2 text-lg font-medium text-white"
                  >
                    <span>Loan Products</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${isMobileDropdownOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="space-y-1 border-l border-white/10 pl-4">
                      {loanProducts.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="block rounded-lg px-4 py-3 text-[#737780] hover:bg-white/5 hover:text-[#ff825c]"
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
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EMI Calculator
                </Link>

                <Link
                  href="/about-us"
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact-us"
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </>
            )}
            
            {isAdminRoute && !isAdminLoginPage && adminUser ? (
              <>
                <Link
                  href="/admin"
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="block w-full py-2 text-left text-lg font-medium text-[#ff825c]"
                >
                  Logout
                </button>
              </>
            ) : currentUser ? (
              <>
                <Link
                  href="/user/dashboard"
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/user/profile"
                  className="block py-2 text-lg font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleUserLogout}
                  className="block w-full py-2 text-left text-lg font-medium text-[#ff825c]"
                >
                  Logout
                </button>
              </>
            ) : !isAdminRoute ? (
              <Link
                href="/user/login"
                className="block py-2 text-lg font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : null}

            {!isAdminRoute && !currentUser && (
              <Link
                href="/contact-us"
                className="tp-button-primary block w-full px-6 py-3 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Online
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
