import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Alfaazo privacy policy — how we collect, use, and protect your data when using our Punjabi learning app and website.",
  alternates: {
    canonical: "https://alfaazo.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[720px] mx-auto px-6 md:px-10 py-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[0.78rem] text-warm-brown/40">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors no-underline"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-warm-brown/60">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-warm-brown/50 mb-12">
          Last updated: May 12, 2026
        </p>

        <div className="prose-alfaazo">
          <p>
            Alfaazo (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
            operated by Codefeb. This Privacy Policy explains how we collect,
            use, and protect information when you use our website (alfaazo.com)
            and mobile applications.
          </p>

          <h2>Information We Collect</h2>

          <h3>Website Analytics</h3>
          <p>
            We use Google Analytics 4 (GA4) to understand how visitors interact
            with our website. GA4 may collect:
          </p>
          <ul>
            <li>Pages visited and time spent on each page</li>
            <li>Referring website or source</li>
            <li>General geographic location (country/city level)</li>
            <li>Device type, browser, and operating system</li>
            <li>Interactions such as button clicks (e.g., app store links)</li>
          </ul>
          <p>
            Google Analytics uses cookies to distinguish unique users. You can
            opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3>Contact Form</h3>
          <p>
            When you submit our contact form, we collect your name, email
            address, and message content. This information is processed through
            FormSubmit.co and delivered to us via email. We use this information
            solely to respond to your inquiry.
          </p>

          <h3>Mobile Application</h3>
          <p>
            Our mobile app may collect usage data such as lesson progress,
            streaks, and app interactions to provide and improve the learning
            experience. Please refer to the app store listing for
            platform-specific privacy details.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Improve our website and app experience</li>
            <li>Understand which content and features are most useful</li>
            <li>Respond to contact form inquiries</li>
            <li>Monitor website performance and fix issues</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information. We may
            share anonymised, aggregated data with analytics providers (Google)
            as described above.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies for Google Analytics. These are small text
            files stored on your device that help us understand website usage.
            You can manage cookie preferences through your browser settings.
          </p>

          <h2>Third-Party Services</h2>
          <p>Our website and app use the following third-party services:</p>
          <ul>
            <li>
              <strong>Google Analytics 4</strong> — website analytics
            </li>
            <li>
              <strong>FormSubmit.co</strong> — contact form processing
            </li>
            <li>
              <strong>Firebase / Firestore</strong> — blog content delivery
            </li>
            <li>
              <strong>Vercel</strong> — website hosting
            </li>
          </ul>
          <p>
            Each of these services has its own privacy policy governing data
            handling.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Alfaazo is a language learning app suitable for all ages. We do not
            knowingly collect personal information from children under 13. If you
            believe we have collected information from a child, please contact us
            so we can promptly remove it.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of analytics tracking</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please{" "}
            <Link href="/contact">contact us</Link>.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-primary/12 text-center">
          <Link
            href="/"
            className="text-primary font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
