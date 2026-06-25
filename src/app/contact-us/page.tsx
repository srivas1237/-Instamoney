import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import LoanForm from '@/components/LoanForm'

const contactInfo = [
  { icon: Phone, title: 'Phone', value: '+91-8167478979' },
  { icon: Mail, title: 'Email', value: 'care@kashless.in' },
  {
    icon: MapPin,
    title: 'Address',
    value:
      'Kashless (A Part of WebFino Solution Private Limited), RDB Boulevard, PL K1 Block EP & GP, Sector V, Bidhan Nagar CK Market, North 24 Parganas, Salt Lake, Kolkata, West Bengal, 700019, India',
  },
  { icon: Clock, title: 'CIN', value: 'U62012WB2025PTC283996' },
]

export default function ContactUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#050a14] mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
              Have questions? We're here to help. Get in touch with us for any queries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-[#050a14] mb-8">Get in Touch</h2>
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-[#0052ff] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#050a14] font-semibold mb-1">{info.title}</h3>
                    <p className="text-[#6b7280]">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:justify-end">
              <LoanForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
