import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Grievance Redressal - InstaMoney',
  description: 'Learn how to file a grievance and our redressal process.',
}

export default function GrievanceRedressalPage() {
  return (
    <CompliancePage title="Grievance Redressal Policy">
      <h2>1. Introduction</h2>
      <p>
        We are committed to addressing your concerns promptly and effectively. This policy outlines the process for filing grievances
        and our redressal mechanism.
      </p>

      <h2>2. How to File a Grievance</h2>
      <p>You can file a grievance through any of the following channels:</p>
      <ul>
        <li>Email: grievance@instamoney.in</li>
        <li>Phone: +91 123 456 7890</li>
        <li>Post: 123 Financial Hub, Mumbai, Maharashtra, India</li>
      </ul>

      <h2>3. Grievance Redressal Process</h2>
      <ol>
        <li>
          <strong>Acknowledgment:</strong> We will acknowledge your grievance within 24 hours of receipt.
        </li>
        <li>
          <strong>Investigation:</strong> We will investigate your grievance and take appropriate action.
        </li>
        <li>
          <strong>Resolution:</strong> We will resolve your grievance within 30 days of receipt.
        </li>
        <li>
          <strong>Escalation:</strong> If you are not satisfied with the resolution, you may escalate to our senior management.
        </li>
      </ol>

      <h2>4. Contact Details for Grievance Redressal</h2>
      <p>
        Grievance Officer: Mr. John Doe<br />
        Email: grievance@instamoney.in<br />
        Phone: +91 123 456 7890
      </p>
    </CompliancePage>
  )
}
