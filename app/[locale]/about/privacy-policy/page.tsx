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
  return buildMetadata({ locale, path: "/about/privacy-policy", namespace: "privacyPolicy" });
}

const LAST_UPDATED = "May 20, 2026";
const CONTACT_EMAIL = "japansrilanka67@gmail.com";
const CONTACT_PHONE_DISPLAY = "+94 33 2232 667";
const CONTACT_PHONE_TEL = "+94332232667";
const WHATSAPP_DISPLAY = "+94 77 722 6726";
const WHATSAPP_LINK = "https://wa.me/94777226726";

export default async function PrivacyPolicyPage({
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
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-16 text-slate-700 text-[16px] sm:text-[17px] leading-[1.75]">
          <p>
            At Japan Sri Lanka Technology &amp; Cultural Centre (JSLTCC), we
            respect your privacy. This page explains, in plain language, what
            we collect, why we collect it, and your rights over it.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-12 mb-3 tracking-tight">
            Information we collect
          </h2>
          <p>
            When you contact us through our website or lead forms, we collect
            basic information such as your <strong>name</strong>,{" "}
            <strong>phone number</strong>, and <strong>email address</strong>.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            How we use your information
          </h2>
          <p>
            We use this information only to respond to your enquiries about our
            Japanese language courses and study-abroad programs. We do not use
            it for anything else.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            We don&apos;t sell your data
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to any
            third parties.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            How we protect your information
          </h2>
          <p>
            We take reasonable care to protect your information. However, like
            most organizations, we cannot guarantee complete security against
            hacking or technical issues.
          </p>

          <h2 className="text-slate-900 font-semibold text-xl sm:text-2xl mt-10 mb-3 tracking-tight">
            Deleting your information
          </h2>
          <p>
            If you would like us to delete your information at any time, please
            contact us using the details below and we will do so promptly.
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
              <span className="text-slate-500 text-sm w-28 shrink-0">Phone</span>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="text-[#c0392b] hover:text-[#e74c3c] font-medium"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="text-slate-500 text-sm w-28 shrink-0">WhatsApp</span>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c0392b] hover:text-[#e74c3c] font-medium"
              >
                {WHATSAPP_DISPLAY}
              </a>
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
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
