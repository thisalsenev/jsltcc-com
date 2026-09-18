import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/about/terms-of-use", namespace: "termsOfUse" });
}

const LAST_UPDATED = "May 26, 2026";
const CONTACT_EMAIL = "japansrilanka67@gmail.com";

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <main className="pt-20 bg-[#fbf7f5] min-h-screen">
        {/* Header band */}
        <section className="bg-[#0f172a] py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-instrument-serif text-4xl sm:text-5xl text-white tracking-tight mb-3">
              Terms of Use
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-16 text-slate-700 text-[16px] sm:text-[17px] leading-[1.75]">
          <p>
            Welcome to JSLTCC (Japan Sri Lanka Technology &amp; Cultural Centre).
            These Terms of Use describe the rules for using our website, the
            student portal, and the learning tools we provide. By using any of
            them, you agree to these terms.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-12 mb-3 tracking-tight">
            Who can use our services
          </h2>
          <p>
            Our services are intended for students learning Japanese and people
            interested in study-abroad programs. If you are under 18, please
            use the services with a parent or guardian&apos;s permission. You
            agree to provide accurate information when contacting us or signing
            up for an account.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Your account
          </h2>
          <p>
            If you create a student portal account, you are responsible for
            keeping your password safe and for any activity that happens on
            your account. Please don&apos;t share your login with others. If
            you think someone else has accessed your account, contact us
            straight away.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Acceptable use
          </h2>
          <p>
            Please use our services respectfully. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Harass, threaten, or harm other students or staff.</li>
            <li>Upload or share content that is illegal, hateful, or sexually explicit.</li>
            <li>Try to break, scrape, or reverse-engineer the service.</li>
            <li>Share your account with others or use someone else&apos;s account.</li>
            <li>Use the service for anything other than learning Japanese and related study-abroad activities.</li>
          </ul>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            AI Voice Partner &amp; other AI tools
          </h2>
          <p>
            The student portal includes AI-powered tools, including the AI
            Voice Partner. These tools generate responses automatically and{" "}
            <strong>may sometimes be wrong, incomplete, or misleading</strong>.
            Please treat AI responses as a study aid, not a substitute for your
            teacher. Don&apos;t share sensitive personal information (national
            ID numbers, banking details, etc.) with the AI tools.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Course materials &amp; content
          </h2>
          <p>
            Lessons, exam questions, flashcards, and other educational content
            on our website and portal are owned by JSLTCC or our partners. You
            may use them for your own personal study. Please do not republish,
            redistribute, or sell them without our written permission.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Content you submit
          </h2>
          <p>
            Anything you submit through the portal — chat messages with the AI
            Partner, exam answers, notes — remains your content. By submitting
            it, you give us permission to store and process it so we can
            provide the service to you (for example, showing you your exam
            results or chat history).
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Suspending or closing accounts
          </h2>
          <p>
            We may suspend or close an account if it&apos;s used in a way that
            breaks these terms, disrupts the service for others, or puts our
            staff or other students at risk. If we close your account for these
            reasons, you may lose access to lessons and study history. You can
            also close your account at any time by contacting us.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            No guarantees
          </h2>
          <p>
            We do our best to keep the service working well, but we can&apos;t
            guarantee it will always be available, error-free, or perfectly
            accurate. The service is provided &quot;as is&quot;. We&apos;re not
            liable for any indirect losses you might suffer from using the
            service (for example, a missed exam result because of a technical
            outage). This doesn&apos;t affect your statutory rights.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Changes to these terms
          </h2>
          <p>
            We may update these terms from time to time. When we do,
            we&apos;ll update the &quot;Last updated&quot; date at the top of
            this page. If the changes are significant, we&apos;ll try to let
            you know directly (for example, by email or a notice in the
            portal).
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Governing law
          </h2>
          <p>
            These terms are governed by the laws of Sri Lanka. Any disputes
            will be handled by the courts of Sri Lanka.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-4 tracking-tight">
            Contact us
          </h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="text-slate-500 text-sm w-28 shrink-0">Email</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#c0392b] hover:text-[#e74c3c] break-all font-medium"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="text-slate-500 text-sm w-28 shrink-0">Address</span>
              <span className="font-medium text-slate-700">
                Japan Sri Lanka Technology &amp; Cultural Centre, Sri Lanka
              </span>
            </div>
          </div>

          {/* Back links */}
          <div className="mt-14 flex flex-col sm:flex-row gap-3 sm:gap-6">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-[#c0392b] font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              Back to About
            </Link>
            <Link
              href={`/${locale}/about/privacy-policy`}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
