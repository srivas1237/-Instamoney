import { Metadata } from 'next'
import CompliancePage from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Disclaimer - InstaMoney',
  description: 'Disclaimer regarding the use of InstaMoney services.',
}

export default function DisclaimerPage() {
  return (
    <CompliancePage title="Disclaimer">
      <h2>General Disclaimer</h2>
      <p>
        The information provided on this website is for general informational purposes only. All information is provided in good faith,
        however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
        reliability, availability, or completeness of any information on the website.
      </p>

      <h2>Financial Disclaimer</h2>
      <p>
        The website cannot and does not contain financial advice. The financial information is provided for general informational and
        educational purposes only and is not a substitute for professional advice.
      </p>

      <h2>External Links Disclaimer</h2>
      <p>
        The website may contain links to external websites that are not provided or maintained by or in any way affiliated with InstaMoney.
        Please note that InstaMoney does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these
        external websites.
      </p>

      <h2>Professional Disclaimer</h2>
      <p>
        The website cannot and does not contain professional advice. The information is provided for general informational and educational
        purposes only and is not a substitute for professional advice.
      </p>
    </CompliancePage>
  )
}
