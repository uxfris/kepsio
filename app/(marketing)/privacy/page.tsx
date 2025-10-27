import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Kepsio",
  description: "Privacy Policy for Kepsio",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-section">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-surface" />
          </div>
          <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
        </div>

        {/* Last Updated */}
        <p className="text-sm text-muted mb-8">Last Updated: December 2024</p>

        {/* Content */}
        <div className="space-y-8 text-primary prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted leading-relaxed">
              At Kepsio ("we", "us", or "our"), we are committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our
              AI-powered caption generation service. Please read this policy
              carefully to understand our views and practices regarding your
              personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              1.1 Personal Information
            </h3>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register for an account</li>
                <li>Subscribe to our service</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address</li>
                <li>Billing and payment information</li>
                <li>Profile information and preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              1.2 Usage Information
            </h3>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                We automatically collect certain information when you use our
                Service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Device information (IP address, browser type, device type)
                </li>
                <li>Usage patterns and interactions with the Service</li>
                <li>Log data and timestamps</li>
                <li>Performance data and error reports</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              1.3 Content Information
            </h3>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                When you use our AI caption generation features, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Content you input for caption generation</li>
                <li>Selected preferences and settings</li>
                <li>Generated outputs and saved content</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send administrative information and updates</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Personalize your experience</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Enforce our Terms of Service</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Share Your Information
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.1 Service Providers
              </h3>
              <p>
                We may share your information with third-party service providers
                who perform services on our behalf, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processing</li>
                <li>Cloud hosting and infrastructure</li>
                <li>Analytics and monitoring</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.2 Legal Requirements
              </h3>
              <p>
                We may disclose your information if required by law or in
                response to valid requests by public authorities.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.3 Business Transfers
              </h3>
              <p>
                If we are involved in a merger, acquisition, or sale of assets,
                your information may be transferred as part of that transaction.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.4 With Your Consent
              </h3>
              <p>
                We may share your information with third parties when you have
                given us consent to do so.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. AI and Machine Learning
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                Our Service uses artificial intelligence and machine learning
                technologies to provide caption generation. By using the
                Service, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We may use your content and usage data to train and improve
                  our AI models
                </li>
                <li>
                  Content you input may be processed by AI services to generate
                  outputs
                </li>
                <li>
                  We implement appropriate safeguards to protect your data
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet or
                electronic storage is 100% secure.
              </p>
              <p>Your security measures may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption in transit and at rest</li>
                <li>Access controls and authentication</li>
                <li>Regular security audits and updates</li>
                <li>Secure data centers and hosting infrastructure</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Your Rights and Choices
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete data
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to
                  another service
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your
                  personal information
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of
                  processing
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Withdraw consent for data
                  processing
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at
                privacy@kepsio.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                We use cookies and similar tracking technologies to track
                activity on our Service and store certain information. Cookies
                are files with small amounts of data which may include an
                anonymous unique identifier.
              </p>
              <p>We use cookies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remembering your preferences and settings</li>
                <li>Analyzing site traffic and usage patterns</li>
                <li>Providing relevant advertisements (if applicable)</li>
                <li>Improving user experience</li>
              </ul>
              <p>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Third-Party Links
            </h2>
            <p className="text-muted leading-relaxed">
              Our Service may contain links to third-party websites or services.
              We are not responsible for the privacy practices of these third
              parties. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Children's Privacy
            </h2>
            <p className="text-muted leading-relaxed">
              Our Service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-muted leading-relaxed">
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              data protection laws that differ from those of your country. We
              ensure appropriate safeguards are in place to protect your
              information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Data Retention</h2>
            <p className="text-muted leading-relaxed">
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. When we
              no longer need your information, we will securely delete or
              anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-muted leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date. We encourage you
              to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              13. California Privacy Rights
            </h2>
            <p className="text-muted leading-relaxed">
              If you are a California resident, you have additional rights under
              the California Consumer Privacy Act (CCPA), including the right to
              know what personal information is collected, the right to delete
              personal information, and the right to opt-out of the sale of
              personal information (we do not sell personal information).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              14. GDPR Rights (EU Users)
            </h2>
            <p className="text-muted leading-relaxed">
              If you are located in the European Economic Area (EEA), you have
              additional rights under the General Data Protection Regulation
              (GDPR), including rights to access, rectification, erasure,
              restriction, portability, and objection. You also have the right
              to lodge a complaint with a supervisory authority.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Contact Us</h2>
            <p className="text-muted leading-relaxed">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-background rounded-lg p-4 mt-4">
              <p className="text-muted">Email: privacy@kepsio.com</p>
              <p className="text-muted">
                Data Protection Officer: dpo@kepsio.com
              </p>
              <p className="text-muted">Address: [Your Company Address]</p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted">
            By using Kepsio, you acknowledge that you have read, understood, and
            agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
