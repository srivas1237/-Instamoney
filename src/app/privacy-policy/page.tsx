import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Privacy Policy - Kashless',
  description: 'Learn how Kashless (A Part of WebFino Solution Private Limited) collects, uses, and protects personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <CompliancePage title="Privacy Policy" lastUpdated="November 25, 2025">
      <p>
        <strong>Effective Date:</strong> January 1, 2025
      </p>
      <p>
        This Privacy Policy applies to <strong>Kashless (A Part of WebFino Solution Private Limited)</strong>. It explains
        how we collect, use, store, disclose, and protect personal data when you use our website, application flows,
        APIs, merchant onboarding systems, and partner platforms.
      </p>

      <h2>1. Introduction</h2>
      <p>
        Kashless is operated as a part of WebFino Solution Private Limited. We provide digital financial infrastructure,
        payment workflows, merchant enablement, financing support systems, and related platform services for users,
        merchants, partners, and regulated entities.
      </p>
      <p>
        We are committed to protecting privacy and handling personal data responsibly in line with the Digital Personal
        Data Protection Act, 2023, relevant RBI guidance, digital lending expectations, payment ecosystem requirements,
        and other applicable legal obligations.
      </p>

      <h2>2. Definitions</h2>
      <p>
        <strong>Personal Data</strong> means any data about an individual who is identifiable by or in relation to such
        data.
      </p>
      <p>
        <strong>Data Principal</strong> means the individual to whom the personal data relates.
      </p>
      <p>
        <strong>Data Fiduciary</strong> means WebFino Solution Private Limited, operating Kashless, which determines the
        purpose and means of processing personal data.
      </p>
      <p>
        <strong>Processing</strong> includes collection, storage, use, disclosure, sharing, and deletion of personal data.
      </p>
      <p>
        <strong>Third-Party Services</strong> means external platforms, APIs, or integrations such as banks, NBFCs,
        payment partners, UPI partners, insurers, analytics providers, or compliance vendors used to deliver services.
      </p>

      <h2>3. Categories Of Data Collected</h2>
      <p>Depending on the service you use, we may collect and process the following data:</p>
      <ul>
        <li>Basic information such as name, email address, mobile number, business name, and designation.</li>
        <li>KYC and identity data such as PAN details, masked Aadhaar details, address proof, or business registration records.</li>
        <li>Financial data such as bank account details, UPI identifiers, transaction history, and lending-related data where applicable.</li>
        <li>Device and network data such as IP address, browser type, operating system, device identifiers, and usage logs.</li>
        <li>Behavioral and analytical data such as website activity, clickstream information, preferences, and feedback.</li>
        <li>Third-party data received from regulated entities, lenders, credit bureaus, insurers, or verification partners where applicable.</li>
      </ul>

      <h2>4. Methods Of Data Collection</h2>
      <p>We may collect data through the following channels:</p>
      <ul>
        <li>User registration and onboarding forms</li>
        <li>Payment and transaction processing flows</li>
        <li>KYC verification APIs and document checks</li>
        <li>Cookies, SDKs, analytics tools, and website trackers</li>
        <li>Third-party payment, lending, or partner integrations</li>
        <li>Support channels such as calls, email, WhatsApp, or other service interactions</li>
      </ul>

      <h2>5. Purpose Of Processing</h2>
      <p>We process data for lawful business and compliance purposes, including:</p>
      <ul>
        <li>Enabling payment processing, collections, and finance-related workflows</li>
        <li>Performing identity verification and KYC checks</li>
        <li>Supporting loan, merchant, insurance, or partner onboarding processes</li>
        <li>Recording and securing transactions</li>
        <li>Detecting, preventing, and investigating fraud, misuse, or unauthorized access</li>
        <li>Improving platform performance, usability, and customer experience</li>
        <li>Complying with applicable legal, contractual, regulatory, and audit obligations</li>
        <li>Sending product updates, alerts, promotions, or service communications where permitted</li>
      </ul>

      <h2>6. Legal Basis And Consent</h2>
      <p>
        We process personal data based on consent, contractual necessity, legitimate operational requirements, and legal
        or regulatory obligations, depending on the service context.
      </p>
      <p>
        Where required by law, we seek explicit consent before processing personal data. Consent may be withdrawn, subject
        to legal, regulatory, fraud-prevention, or contractual retention requirements.
      </p>

      <h2>7. Data Storage And Security</h2>
      <p>
        We maintain administrative, technical, and organizational controls designed to protect personal data from unauthorized
        access, loss, misuse, alteration, or disclosure.
      </p>
      <ul>
        <li>Encryption controls are used for data in transit and, where applicable, at rest.</li>
        <li>Access is restricted using role-based controls and operational monitoring.</li>
        <li>Systems are hosted in controlled infrastructure environments aligned with applicable norms.</li>
        <li>Backups, logging, and recovery processes are maintained to support resilience and continuity.</li>
        <li>Data is retained only for as long as reasonably necessary or legally required.</li>
      </ul>

      <h2>8. Data Sharing And Disclosure</h2>
      <p>
        We may share limited data with trusted service providers, regulated entities, infrastructure partners, and legal
        authorities where needed to operate the platform, process transactions, complete verifications, or comply with law.
      </p>
      <ul>
        <li>Partner banks, NBFCs, insurers, and regulated entities for verification, funding, or servicing workflows</li>
        <li>Payment gateway, UPI, or collection partners for transaction processing</li>
        <li>Cloud and infrastructure providers for secure hosting and service delivery</li>
        <li>Compliance, audit, legal, fraud control, and security support vendors</li>
        <li>Law enforcement or statutory authorities where disclosure is required by law</li>
      </ul>
      <p>We do not sell or rent personal data to third parties.</p>

      <h2>9. User Rights</h2>
      <p>
        Subject to applicable law, users may have the right to request access, correction, update, deletion, consent withdrawal,
        or grievance review in relation to their personal data.
      </p>
      <ul>
        <li>Right to access data processed by us</li>
        <li>Right to request correction of inaccurate or outdated data</li>
        <li>Right to request erasure where legally permissible</li>
        <li>Right to withdraw consent for consent-based processing</li>
        <li>Right to raise grievances regarding privacy or data handling</li>
      </ul>

      <h2>10. Cookies And Tracking Technologies</h2>
      <p>
        We may use cookies and similar tools to improve website functionality, remember preferences, understand traffic,
        measure engagement, and enhance platform performance. Browser settings may be used to block or remove cookies,
        though some services may not function fully as a result.
      </p>

      <h2>11. International Data Transfers</h2>
      <p>
        If personal data is processed or accessed outside India, such transfer will be managed in accordance with applicable
        legal requirements and with reasonable safeguards appropriate to the nature of the data and service.
      </p>

      <h2>12. Grievance Redressal</h2>
      <p>
        If you have any questions, concerns, or complaints regarding this Privacy Policy or our data handling practices,
        please contact us using the details below:
      </p>
      <p>
        <strong>Entity:</strong> Kashless (A Part of WebFino Solution Private Limited)
      </p>
      <p>
        <strong>Email:</strong> care@kashless.in
      </p>
      <p>
        <strong>Phone:</strong> +91-8167478979
      </p>
      <p>
        <strong>Address:</strong> RDB Boulevard, PL K1 Block EP &amp; GP, Sector V, Bidhan Nagar CK Market, North 24 Parganas,
        Salt Lake, Kolkata, West Bengal, 700019, India
      </p>

      <h2>13. Policy Updates</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect service changes, regulatory developments, or operational
        improvements. The latest version will always be available on this page with the updated revision date.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        For privacy, compliance, or support-related queries, please contact <strong>Kashless (A Part of WebFino Solution Private Limited)</strong> at{' '}
        <strong>care@kashless.in</strong>.
      </p>
    </CompliancePage>
  )
}

