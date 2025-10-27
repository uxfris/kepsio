import { Metadata } from "next";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Kepsio",
  description: "Terms of Service for Kepsio",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-section">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-surface" />
          </div>
          <h1 className="text-4xl font-bold text-primary">Terms of Service</h1>
        </div>

        {/* Last Updated */}
        <p className="text-sm text-muted mb-8">Last Updated: December 2024</p>

        {/* Content */}
        <div className="space-y-8 text-primary prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted leading-relaxed">
              By accessing and using Kepsio ("Service"), you accept and agree to
              be bound by the terms and provision of this agreement. If you do
              not agree to these Terms of Service, you should not use our
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="text-muted leading-relaxed">
              Kepsio is an AI-powered caption generation platform designed to
              help users create social media content. The Service provides
              AI-generated captions, suggestions, and content creation tools for
              various social media platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                To access certain features of the Service, you must register for
                an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Provide accurate, current, and complete information during
                  registration
                </li>
                <li>
                  Maintain and update your information to keep it accurate and
                  complete
                </li>
                <li>Maintain the security of your account credentials</li>
                <li>
                  Accept responsibility for all activities that occur under your
                  account
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Use the Service for any illegal purpose or in violation of any
                  local, state, national, or international law
                </li>
                <li>
                  Violate or encourage others to violate any right of a third
                  party
                </li>
                <li>
                  Interfere with or disrupt the Service or servers or networks
                  connected to the Service
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service or its
                  related systems or networks
                </li>
                <li>
                  Use automated systems (e.g., bots) to access the Service
                  without our permission
                </li>
                <li>
                  Impersonate any person or entity or misrepresent your
                  affiliation with any person or entity
                </li>
                <li>
                  Generate or use content that is harmful, abusive,
                  discriminatory, or illegal
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Intellectual Property
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                The Service and its original content, features, and
                functionality are owned by Kepsio and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <p>
                Generated content created using our Service belongs to you,
                subject to the limitations set forth in these Terms. You retain
                ownership of any content you input into the Service, and you
                grant Kepsio a license to use such content to provide the
                Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. AI-Generated Content
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                Our Service uses artificial intelligence to generate content.
                You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  AI-generated content may not always be accurate, appropriate,
                  or suitable for your intended use
                </li>
                <li>
                  You are responsible for reviewing, editing, and verifying all
                  AI-generated content before use
                </li>
                <li>
                  You will not use AI-generated content in a way that misleads
                  others about its origin or nature
                </li>
                <li>
                  We are not responsible for any consequences resulting from
                  your use of AI-generated content
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Subscription and Billing
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                Certain features of the Service may require payment. By
                subscribing to a paid plan, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Pay all fees associated with your account and selected plan
                </li>
                <li>Provide accurate billing and payment information</li>
                <li>
                  Authorize us to charge your payment method for all applicable
                  fees
                </li>
                <li>
                  Accept that all fees are non-refundable except as required by
                  law or as stated in our refund policy
                </li>
              </ul>
              <p>
                We reserve the right to change our pricing with 30 days' notice.
                Your continued use of the Service after price changes
                constitutes your agreement to the new pricing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Cancellation and Termination
            </h2>
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                You may cancel your subscription at any time. Upon cancellation,
                you will retain access to premium features until the end of your
                current billing period.
              </p>
              <p>
                We reserve the right to suspend or terminate your account and
                access to the Service at any time, with or without cause, with
                or without notice, for any reason including, but not limited to,
                breach of these Terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-muted leading-relaxed">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE
              EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-muted leading-relaxed">
              IN NO EVENT SHALL KEPSIO OR ITS DIRECTORS, EMPLOYEES, OR AGENTS BE
              LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL,
              INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT,
              LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE
              OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
            <p className="text-muted leading-relaxed">
              You agree to indemnify and hold harmless Kepsio, its officers,
              directors, employees, and agents from and against any and all
              claims, damages, obligations, losses, liabilities, costs, or debt,
              and expenses (including attorney's fees) arising from your use of
              the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Changes to Terms
            </h2>
            <p className="text-muted leading-relaxed">
              We reserve the right to modify these Terms at any time. We will
              notify users of any material changes by posting the new Terms on
              this page and updating the "Last Updated" date. Your continued use
              of the Service after any changes constitutes your acceptance of
              the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-muted leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law provisions. Any disputes arising under or in connection with
              these Terms shall be subject to the exclusive jurisdiction of the
              courts located in [Your Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              14. Contact Information
            </h2>
            <p className="text-muted leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <div className="bg-background rounded-lg p-4 mt-4">
              <p className="text-muted">Email: legal@kepsio.com</p>
              <p className="text-muted">Address: [Your Company Address]</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              15. Entire Agreement
            </h2>
            <p className="text-muted leading-relaxed">
              These Terms constitute the entire agreement between you and Kepsio
              regarding your use of the Service and supersede all prior
              agreements and understandings.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted">
            By using Kepsio, you acknowledge that you have read, understood, and
            agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
