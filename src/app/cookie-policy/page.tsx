import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Cookie Policy - InstaMoney',
  description: 'Learn how InstaMoney uses cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <CompliancePage title="Cookie Policy">
      <h2>What Are Cookies</h2>
      <p>
        Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser
        and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.
      </p>

      <h2>How We Use Cookies</h2>
      <p>
        We use cookies for various purposes including: to authenticate users, to remember user preferences, to analyze website traffic,
        and to improve our services.
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.
        </li>
        <li>
          <strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website.
        </li>
        <li>
          <strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners.
        </li>
      </ul>

      <h2>Controlling Cookies</h2>
      <p>
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept
        cookies, you may not be able to use some portions of our website.
      </p>
    </CompliancePage>
  )
}
