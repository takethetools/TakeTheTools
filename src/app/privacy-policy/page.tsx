import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TakeThe Tools",
  description:
    "Learn how TakeThe Tools protects your privacy. We process all data locally on your device and never store your files.",
  alternates: {
    canonical: "https://takethetools.com/privacy-policy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Privacy <span className="text-primary-600">Policy</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your trust is our most valuable asset. Here is how we collect, use,
            and protect your information.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Last Updated: May 10, 2026 &nbsp;|&nbsp; Effective Date: May 10, 2026
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-slate max-w-none bg-white rounded-3xl border border-slate-100 shadow-sm p-10 space-y-10">

          {/* Intro */}
          <p className="text-slate-600 leading-relaxed">
            Welcome to <strong>TakeTheTools</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit{" "}
            <strong>takethetools.com</strong> (the &quot;Site&quot;). Please read this
            policy carefully. If you disagree with its terms, please stop using
            the Site.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              1.1 Information You Provide to Us
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              We may collect information that you voluntarily provide when you
              contact us via the contact form or email, submit a tool request or
              bug report, or subscribe to our newsletter. This may include your{" "}
              <strong>name</strong>, <strong>email address</strong>, and the{" "}
              <strong>content of your message</strong>.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              1.2 Information Collected Automatically
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              When you visit our Site, certain information is automatically
              collected, including your IP address (anonymized where possible),
              browser type and version, operating system, referring URLs, pages
              visited and time spent, date and time of your visit, and device
              type.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              1.3 File Processing Data
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Most of our tools process your files and data{" "}
              <strong>entirely within your browser</strong> using client-side
              JavaScript. Your files <strong>never leave your device</strong>{" "}
              and are never transmitted to or stored on our servers. For tools
              that require server-side processing, files are processed in secure,
              temporary environments and <strong>deleted immediately</strong>{" "}
              after the operation is complete.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We use the information we collect to operate and maintain the Site,
              analyze usage patterns to improve performance, respond to your
              inquiries, monitor and prevent technical issues, display relevant
              advertisements through third-party ad networks, and comply with
              legal obligations.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Cookies and Tracking Technologies
            </h2>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              3.1 Types of Cookies We Use
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">Cookie Type</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Purpose</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Can You Opt Out?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 text-slate-600 font-medium">Essential Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Required for the Site to function</td>
                    <td className="px-4 py-3 text-slate-600">No — required for core functionality</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600 font-medium">Analytics Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Help us understand how visitors use the Site</td>
                    <td className="px-4 py-3 text-slate-600">Yes — see Section 3.2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600 font-medium">Advertising Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Used to display relevant ads via Google AdSense</td>
                    <td className="px-4 py-3 text-slate-600">Yes — see Section 3.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              3.2 How to Control Cookies
            </h3>
            <p className="text-slate-600 leading-relaxed">
              You can control and delete cookies through your browser settings.
              You can also opt out of Google advertising cookies at{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Google Ad Settings
              </a>
              .
            </p>
          </section>

          {/* Section 4 — ADSENSE */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Google AdSense (Advertising)
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use <strong>Google AdSense</strong> to display advertisements
              on our Site. Google AdSense is an advertising service provided by
              Google LLC. Google AdSense uses cookies and similar tracking
              technologies to serve ads based on your prior visits to our Site
              and other websites across the internet.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Google may use the <strong>DoubleClick cookie</strong> to serve
              personalized ads based on your interests. You can opt out of
              personalized advertising at any time by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Google Ad Settings
              </a>
              . For more information, visit{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Google&apos;s Privacy & Terms
              </a>
              .
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our Google AdSense Publisher ID is:{" "}
              <strong>ca-pub-3148286057781421</strong>
            </p>
          </section>

          {/* Section 5 — GOOGLE ANALYTICS */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Google Analytics
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use <strong>Google Analytics</strong>, a web analytics service
              provided by Google LLC, to understand how visitors interact with
              our Site. Google Analytics collects anonymized information such as
              pages visited, time spent on each page, how you arrived at our
              Site, your approximate geographic location, and your device and
              browser type. This data does not identify you as an individual.
            </p>
            <p className="text-slate-600 leading-relaxed">
              You can prevent Google Analytics from collecting your data by
              installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Google Analytics Opt-Out Browser Add-On
              </a>
              .
            </p>
          </section>

          {/* Section 6 — VERCEL ANALYTICS */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Vercel Analytics
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our Site is hosted on <strong>Vercel</strong>, and we use{" "}
              <strong>Vercel Analytics</strong> to monitor Site performance and
              visitor behavior. Vercel Analytics collects anonymized, aggregated
              data such as page views, geographic region, and device type. It is
              designed to be <strong>privacy-friendly</strong> and does not use
              cookies or store personally identifiable information. For more
              information, visit{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Vercel&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Data Sharing and Disclosure
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We do <strong>not sell, trade, or rent</strong> your personal
              information to third parties. We may share your information only
              when required by law, to protect the rights and safety of our
              users, or with trusted service providers who assist in operating
              our Site and are bound by confidentiality obligations.
            </p>
          </section>

          {/* Section 8 — GDPR/CCPA */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Your Privacy Rights
            </h2>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              8.1 For EU/EEA Residents (GDPR)
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Under GDPR, you have the right to access, correct, delete, or
              restrict processing of your personal data, as well as the right to
              data portability and to withdraw consent at any time.
            </p>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              8.2 For California Residents (CCPA)
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              California residents have the right to know what personal data is
              collected, request deletion of their data, and opt out of the sale
              of personal data. We do <strong>not sell</strong> personal data.
            </p>
            <p className="text-slate-600 leading-relaxed">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@takethetools.com"
                className="text-primary-600 hover:underline"
              >
                privacy@takethetools.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our Site is not directed to children under the age of 13 (or 16 in
              the EU/EEA). We do not knowingly collect personal information from
              children. If you believe a child has submitted information to us,
              please contact us at{" "}
              <a
                href="mailto:privacy@takethetools.com"
                className="text-primary-600 hover:underline"
              >
                privacy@takethetools.com
              </a>{" "}
              and we will delete it immediately.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy periodically. When we make
              significant changes, we will update the &quot;Last Updated&quot; date at
              the top of this page. Your continued use of the Site after changes
              are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 11 — Contact */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Contact Us
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact
              us:
            </p>
            <ul className="mt-3 space-y-1 text-slate-600">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@takethetools.com"
                  className="text-primary-600 hover:underline"
                >
                  privacy@takethetools.com
                </a>
              </li>
              <li>
                <strong>Support:</strong>{" "}
                <a
                  href="mailto:support@takethetools.com"
                  className="text-primary-600 hover:underline"
                >
                  support@takethetools.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://takethetools.com/contact"
                  className="text-primary-600 hover:underline"
                >
                  takethetools.com/contact
                </a>
              </li>
            </ul>
          </section>

          <p className="text-slate-400 text-sm pt-4 border-t border-slate-100">
            This Privacy Policy is compliant with GDPR (EU), CCPA (California),
            and Google AdSense program policies.
          </p>
        </div>
      </div>
    </div>
  );
}