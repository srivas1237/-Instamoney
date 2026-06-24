'use client'

import Header from './Header'
import Footer from './Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="tp-shell">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
