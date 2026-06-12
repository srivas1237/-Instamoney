import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Privacy Policy - InstaMoney',
  description: 'Learn how InstaMoney collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <CompliancePage title="Privacy Policy">
      <h2>1. Information We Collect</h2>
      <p>
        We collect personal information that you provide to us when you use our services, including but not limited to:
        name, contact details, financial information, and identification documents.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your information to: process loan applications, verify your identity, communicate with you, improve our services,
        and comply with legal obligations.
      </p>

      <h2>3. Data Security</h2>
      <p>
        We implement appropriate security measures to protect your personal information from unauthorized access, disclosure,
        alteration, or destruction.
      </p>

      <h2>4. Information Sharing</h2>
      <p>
        We may share your information with our partners, service providers, and regulatory authorities as required by law or
        for the purpose of providing our services.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. You may also opt-out of certain communications.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on this page.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at privacy@instamoney.in
      </p>
    </CompliancePage>
  )
}
