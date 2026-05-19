import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using the Alfaazo Punjabi learning app and website.",
  alternates: {
    canonical: "https://www.alfaazo.com/terms",
  },
};

export default function TermsPage() {
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
            <li className="text-warm-brown/60">Terms of Service</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-warm-brown/50 mb-12">
          Last updated: May 12, 2026
        </p>

        <div className="prose-alfaazo">
          <p>
            Welcome to Alfaazo. By accessing or using our website (alfaazo.com)
            and mobile applications (&quot;Services&quot;), you agree to be
            bound by these Terms of Service. If you do not agree with these
            terms, please do not use our Services.
          </p>

          <h2>Use of Services</h2>
          <p>
            Alfaazo provides language learning content for Punjabi and other
            South Asian languages. You may use our Services for personal,
            non-commercial educational purposes. You agree to:
          </p>
          <ul>
            <li>Use our Services in compliance with all applicable laws</li>
            <li>
              Not attempt to disrupt, damage, or gain unauthorised access to our
              Services
            </li>
            <li>
              Not reproduce, distribute, or create derivative works from our
              content without permission
            </li>
            <li>
              Not use automated tools to scrape or extract content from our
              Services
            </li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on Alfaazo — including text, graphics, logos, audio
            recordings, lesson materials, and software — is the property of
            Codefeb or its content suppliers and is protected by intellectual
            property laws. The Alfaazo name, logo, and branding are trademarks
            of Codefeb.
          </p>

          <h2>User Content</h2>
          <p>
            If you submit content through our Services (such as contact form
            messages), you grant us a non-exclusive right to use that content for
            the purpose of responding to your inquiry and improving our Services.
          </p>

          <h2>Blog Content</h2>
          <p>
            Our blog provides educational content about Punjabi language and
            culture. While we strive for accuracy, blog content is provided for
            informational and educational purposes only. Language learning
            outcomes may vary based on individual effort and practice.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our Services may contain links to third-party websites and
            applications, including the Apple App Store and Google Play Store. We
            are not responsible for the content, privacy practices, or terms of
            these external services.
          </p>

          <h2>Disclaimers</h2>
          <p>
            Our Services are provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied. We do not guarantee that our Services will be uninterrupted,
            error-free, or free of viruses or other harmful components.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Codefeb shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of our Services, even if we have been
            advised of the possibility of such damages.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be posted on this page with an updated revision date. Your continued
            use of our Services after any changes constitutes acceptance of the
            new terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable laws, without regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these Terms, please{" "}
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
