import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CompliancePageProps {
  title: string
  children: React.ReactNode
}

export default function CompliancePage({ title, children }: CompliancePageProps) {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-100">
            <Link href="/" className="text-gray-400 hover:text-amber-300 mb-6 inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold gold-text">{title}</h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none text-gray-300">{children}</div>
        </div>
      </section>
    </div>
  )
}
