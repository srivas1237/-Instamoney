import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Refund Policy - Kashless',
  description: 'Learn about the refund policy for Kashless (A Part of WebFino Solution Private Limited).',
}

export default function RefundPolicyPage() {
  return (
    <CompliancePage title="Refund Policy" lastUpdated="November 25, 2025">
      <p>
        <strong>Effective Date:</strong> January 1, 2025
      </p>
      <p>
        This Refund Policy applies to <strong>Kashless (A Part of WebFino Solution Private Limited)</strong>. It explains
        the terms under which refund requests may be reviewed, processed, or declined in relation to our platform, partner,
        payment, and service workflows.
      </p>

      <h2>1. Introduction</h2>
      <p>
        Kashless operates as a part of WebFino Solution Private Limited and may facilitate digital financial workflows,
        platform services, payment integrations, merchant solutions, subscriptions, or partner-led transactions.
      </p>
      <p>
        This policy applies to services offered through our website, APIs, applications, and partner platforms, including
        payments made toward platform usage, service fees, subscriptions, payment integrations, or related enabled workflows.
      </p>
      <p>
        We act as a technology facilitator and service enabler. Refunds may depend on the involvement of banks, payment
        gateways, UPI partners, insurers, lenders, or other third-party institutions and are subject to their operational timelines.
      </p>

      <h2>2. Refund Eligibility</h2>
      <p>Refunds may be considered in the following cases, subject to verification:</p>
      <h3>2.1 Duplicate Payments</h3>
      <p>
        If a user or merchant is charged more than once for the same transaction, a refund may be initiated for the duplicate
        amount after review and validation.
      </p>
      <h3>2.2 Failed Transactions</h3>
      <p>
        If money is debited but the intended payment, service, or beneficiary credit does not complete due to system, network,
        or partner-side issues, a refund may be initiated automatically or after verification.
      </p>
      <h3>2.3 Settlement Delays Or Errors</h3>
      <p>
        If a settlement error, reconciliation mismatch, or technical discrepancy occurs, we may coordinate with relevant
        partners to correct the issue and process refunds where applicable.
      </p>
      <h3>2.4 Subscription Cancellations</h3>
      <p>
        Where subscription-based services are offered, cancellation before renewal may stop future billing. Refunds for an
        already activated subscription period are generally not available unless otherwise stated in writing.
      </p>
      <h3>2.5 Non-Refundable Items</h3>
      <p>The following are generally non-refundable unless required by law or explicitly approved:</p>
      <ul>
        <li>Platform setup or onboarding fees</li>
        <li>KYC verification fees</li>
        <li>Service charges or gateway convenience fees already utilized</li>
        <li>Fees paid onward to third-party institutions or service partners</li>
      </ul>

      <h2>3. Refund Process</h2>
      <h3>3.1 Request Submission</h3>
      <p>To request a refund, please share the following details with our support team:</p>
      <ul>
        <li>Transaction ID or payment reference number</li>
        <li>Transaction amount and date</li>
        <li>Reason for the refund request</li>
        <li>Supporting documents or screenshots, where available</li>
      </ul>
      <h3>3.2 Verification And Processing</h3>
      <p>Once a request is received:</p>
      <ul>
        <li>The request may be acknowledged within 7 working days.</li>
        <li>After verification and approval, the refund may be processed within 7 to 10 business days.</li>
        <li>Refunds are generally credited to the original payment source or linked bank account, depending on the payment channel.</li>
        <li>Partner banks, processors, or gateways may take additional time to reflect the credit.</li>
      </ul>

      <h2>4. Exceptions</h2>
      <p>Refunds may be delayed, restricted, or declined in the following situations:</p>
      <ul>
        <li>Suspected fraud, misuse, or unauthorized activity pending investigation</li>
        <li>Regulatory, compliance, or banking holds imposed by relevant institutions</li>
        <li>Cases where a chargeback or dispute has already been initiated through the issuing bank or card network</li>
        <li>Events beyond reasonable control, including major network failures, legal restrictions, or force majeure situations</li>
      </ul>

      <h2>5. Contact Information</h2>
      <p>For refund-related questions, support, or complaints, please contact:</p>
      <p>
        <strong>Kashless (A Part of WebFino Solution Private Limited)</strong>
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
      <p>
        <strong>Response Timeline:</strong> acknowledgment may be provided within 7 working days, with resolution timelines
        depending on partner, bank, gateway, and verification dependencies.
      </p>

      <h2>6. Additional Notes</h2>
      <ul>
        <li>Refunds are issued only after due verification and, where relevant, approval from financial or processing partners.</li>
        <li>We may update this Refund Policy from time to time, and the latest version will remain available on this page.</li>
        <li>Users should review this page periodically for any updates or revisions.</li>
      </ul>

      <h2>Key Takeaways</h2>
      <ul>
        <li>Duplicate and failed payments may be refundable after verification.</li>
        <li>Approved refunds are generally processed within 7 to 10 business days.</li>
        <li>Platform setup fees, KYC charges, and certain third-party fees are generally non-refundable.</li>
        <li>For help, users may contact <strong>care@kashless.in</strong>.</li>
      </ul>
    </CompliancePage>
  )
}

