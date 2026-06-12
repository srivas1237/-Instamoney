import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy - InstaMoney',
  description: 'Learn about InstaMoney refund and cancellation policy.',
}

export default function RefundPolicyPage() {
  return (
    <CompliancePage title="Refund & Cancellation Policy">
      <h2>1. Processing Fees</h2>
      <p>
        Processing fees paid are non-refundable, except in cases where the loan application is rejected by us.
      </p>

      <h2>2. Loan Cancellation</h2>
      <p>
        You may cancel your loan application before disbursal. Any processing fee paid will be refunded within 7-10 working days.
      </p>

      <h2>3. Prepayment</h2>
      <p>
        Prepayment of loan may be allowed as per the terms of your loan agreement. Any applicable prepayment charges will be
        clearly mentioned in your loan agreement.
      </p>

      <h2>4. Refund Process</h2>
      <p>
        Refunds, if applicable, will be processed to the same bank account from which the payment was made. The refund may take
        7-10 working days to reflect in your account.
      </p>

      <h2>5. Contact for Refunds</h2>
      <p>
        For any refund-related queries, please contact us at refunds@instamoney.in or call us at +91 123 456 7890.
      </p>
    </CompliancePage>
  )
}
