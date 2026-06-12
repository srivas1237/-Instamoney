import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Terms of Service - InstaMoney',
  description: 'Read the terms and conditions for using InstaMoney services.',
}

export default function TermsOfServicePage() {
  return (
    <CompliancePage title="Terms of Service">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using our services, you agree to be bound by these terms of service. If you do not agree, please
        do not use our services.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 21 years old and a resident of India to use our services. You represent that all information
        you provide is accurate and complete.
      </p>

      <h2>3. Loan Terms</h2>
      <p>
        Loan approval, amount, interest rate, and tenure are subject to our credit assessment and applicable laws.
      </p>

      <h2>4. User Responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content on this website is the property of InstaMoney and is protected by intellectual property laws.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        InstaMoney shall not be liable for any indirect, incidental, special, or consequential damages arising out of the use of our services.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of our services constitutes acceptance of the revised terms.
      </p>
    </CompliancePage>
  )
}
