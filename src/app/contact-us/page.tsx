import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react'
import LoanForm from '@/components/LoanForm'

export const metadata: Metadata = {
  title: 'Contact Us - InstaMoney',
  description: 'Get in touch with our team. We are here to help you with all your loan needs.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+91 123 456 7890',
    subDetails: 'Mon-Sat: 9AM - 8PM',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'contact@instamoney.in',
    subDetails: 'support@instamoney.in',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: '123 Financial Hub',
    subDetails: 'Mumbai, Maharashtra, India',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: 'Monday - Saturday',
    subDetails: '9:00 AM - 8:00 PM',
  },
]

export default function ContactUsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-100">
            <Link href="/" className="text-gray-400 hover:text-amber-300 mb-6 inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Contact <span className="gold-text">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are here to help you with all your loan needs. Get in touch with our team today!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Get In Touch</h2>
              <div className="space-y-8">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-3 glass-effect rounded-3xl p-6 border border-amber-900/30">
                    <div className="gold-gradient w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">{info.title}</h3>
                      <p className="text-gray-300">{info.details}</p>
                      <p className="text-gray-500">{info.subDetails}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <LoanForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
