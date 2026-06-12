'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CompliancePageProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export default function CompliancePage({ title, lastUpdated, children }: CompliancePageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-[#5b616e] hover:text-[#eef0f3] mb-8 inline-flex items-center gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h1>
          {lastUpdated && (
            <p className="text-[#5b616e]">Last Updated: {lastUpdated}</p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-invert max-w-none">
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}
