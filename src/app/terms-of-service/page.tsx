import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Terms of Service - Kashless',
  description: 'Read the terms and conditions for using Kashless (A Part of WebFino Solution Private Limited) services.',
}

export default function TermsOfServicePage() {
  return (
    <CompliancePage title="Terms and Conditions" lastUpdated="November 25, 2025">
      <p>
        <strong>Effective Date:</strong> January 1, 2025
      </p>
      <p>
        These Terms and Conditions apply to <strong>Kashless (A Part of WebFino Solution Private Limited)</strong>.
        They govern your access to and use of our website, applications, APIs, partner platforms, merchant systems,
        and related services.
      </p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to Kashless, operated as a part of WebFino Solution Private Limited. These Terms and Conditions
        govern your access to and use of our services. By accessing or using the platform, you agree to be bound by
        these Terms. If you do not agree, you must discontinue use of the services immediately.
      </p>

      <h2>2. User Eligibility</h2>
      <p>
        To use our services, you must:
      </p>
      <ul>
        <li>Be at least 18 years old and legally capable of entering into binding contracts under applicable Indian law.</li>
        <li>Comply with all applicable laws, including relevant information technology, privacy, payment, and regulatory requirements.</li>
        <li>Not be barred or restricted from using such services under any applicable law or regulatory direction.</li>
        <li>If acting on behalf of a business or entity, have authority to bind that entity to these Terms.</li>
      </ul>

      <h2>3. Services Provided</h2>
      <h3>3.1 Description</h3>
      <p>
        Kashless, as part of WebFino Solution Private Limited, may provide technology-enabled financial and payment
        support services, including but not limited to:
      </p>
      <ul>
        <li>Payment gateway and UPI integrations</li>
        <li>API-based collections and settlements support</li>
        <li>Merchant dashboards, analytics, and operational tooling</li>
        <li>Partner enablement for financing, lending support, or related workflows</li>
      </ul>
      <h3>3.2 Limitations</h3>
      <p>
        We act as a technology facilitator and platform operator. We are not a bank, NBFC, or direct lending institution
        unless expressly stated otherwise in a separate regulated agreement.
      </p>
      <ul>
        <li>We do not guarantee credit approval, funding, or underwriting outcomes.</li>
        <li>Some services depend on third-party systems such as banks, NBFCs, payment networks, insurers, or verification providers.</li>
        <li>We are not responsible for delays, downtime, or errors caused solely by external third-party systems.</li>
      </ul>

      <h2>4. Account Creation and Management</h2>
      <h3>4.1 Registration</h3>
      <p>
        To access certain features, you may be required to create an account and provide accurate, current, and complete information.
        You are responsible for maintaining the confidentiality of your login credentials and for activities performed under your account.
      </p>
      <h3>4.2 Suspension or Termination</h3>
      <p>We may suspend or terminate access immediately if:</p>
      <ul>
        <li>You provide false, incomplete, or misleading information.</li>
        <li>You engage in fraud, abuse, unauthorized activity, or unlawful transactions.</li>
        <li>You violate these Terms or any applicable law.</li>
        <li>Action is required by a regulator, law enforcement agency, banking partner, or compliance obligation.</li>
      </ul>

      <h2>5. User Obligations</h2>
      <p>
        By using our services, you agree to:
      </p>
      <ul>
        <li>Maintain the security of your account credentials and access devices.</li>
        <li>Use the platform only for lawful personal or business purposes.</li>
        <li>Not use the platform for money laundering, fraud, gambling, restricted categories, or unlawful activity.</li>
        <li>Not interfere with, probe, or attempt unauthorized access to our systems, infrastructure, or networks.</li>
        <li>Not misuse chargebacks, reversals, refunds, or dispute tools for completed and valid transactions.</li>
      </ul>
      <p>We reserve the right to report suspicious or unlawful activity to relevant authorities.</p>

      <h2>6. Payment Terms</h2>
      <h3>6.1 Settlements</h3>
      <p>
        Settlements, where applicable, are subject to banking hours, reconciliation processes, agreed settlement cycles,
        and partner dependencies. Settlement timelines may vary depending on service type, contract terms, and external systems.
      </p>
      <h3>6.2 Fees and Charges</h3>
      <p>
        Fees, service charges, or transaction charges may apply as agreed with the relevant user, merchant, or partner.
        Taxes and statutory levies remain payable as applicable.
      </p>
      <h3>6.3 Payment Failures</h3>
      <p>We are not responsible for payment failures caused by:</p>
      <ul>
        <li>Network issues, user mistakes, or incorrect payment details</li>
        <li>Bank, gateway, or processor downtime</li>
        <li>Third-party service interruptions or reconciliation delays</li>
      </ul>
      <h3>6.4 Dispute Resolution</h3>
      <p>
        Transaction-related disputes should be reported promptly with sufficient details so that we can coordinate with
        the relevant partner institutions and support teams for fair resolution.
      </p>
      <h3>6.5 Limitation of Financial Liability</h3>
      <p>
        To the maximum extent permitted by law, our aggregate financial liability for any claim relating to a specific
        transaction will not exceed the fees, if any, paid by you in connection with that transaction.
      </p>

      <h2>7. Intellectual Property Rights</h2>
      <p>
        All software, content, text, branding, interfaces, workflows, trademarks, and platform materials are owned by
        or licensed to WebFino Solution Private Limited and its associated platforms, including Kashless.
      </p>
      <ul>
        <li>You receive a limited, non-exclusive, non-transferable right to use the services in accordance with these Terms.</li>
        <li>You may not reproduce, modify, distribute, reverse engineer, decompile, resell, or commercially exploit our platform without authorization.</li>
        <li>Unauthorized use of brand assets, designs, content, or platform logic is prohibited.</li>
      </ul>

      <h2>8. Limitation Of Liability</h2>
      <p>
        Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without guarantees of uninterrupted or error-free operation.
        To the extent permitted by law, we are not liable for indirect, incidental, special, consequential, or business
        interruption losses arising from platform use, inability to use, third-party failures, or user misuse.
      </p>
      <p>
        You agree to indemnify and hold us harmless against claims, losses, damages, liabilities, or expenses arising from
        your misuse of services, regulatory breach, fraud, or violation of these Terms.
      </p>

      <h2>9. Governing Law And Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India. Disputes shall be handled in accordance with applicable law and,
        where enforceable, may first be attempted through good-faith discussions before formal proceedings.
      </p>
      <p>
        Unless otherwise required by law or contract, disputes may be subject to arbitration in accordance with applicable
        Indian arbitration law, with Bengaluru, Karnataka as the venue and English as the language of arbitration.
      </p>

      <h2>10. Modification Of Terms</h2>
      <p>
        We may modify, amend, or update these Terms from time to time. Updates will be reflected on this page with the
        revised last updated date. Continued use of the services after publication of updated Terms constitutes acceptance
        of those changes.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        For questions, clarifications, complaints, or legal communications regarding these Terms, please contact:
      </p>
      <p>
        <strong>Kashless (A Part of WebFino Solution Private Limited)</strong>
      </p>
      <p>
        <strong>Address:</strong> RDB Boulevard, PL K1 Block EP &amp; GP, Sector V, Bidhan Nagar CK Market, North 24 Parganas,
        Salt Lake, Kolkata, West Bengal, 700019, India
      </p>
      <p>
        <strong>Email:</strong> care@kashless.in
      </p>
      <p>
        <strong>Website:</strong> https://www.webfino.com
      </p>

      <h2>Disclaimer</h2>
      <p>
        Use of our services indicates acceptance of these Terms and all applicable policies, including the Privacy Policy
        available on the Kashless platform.
      </p>
    </CompliancePage>
  )
}

