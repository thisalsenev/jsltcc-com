import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsltcc.com"
).replace(/\/$/, "");

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  ja: "ja_JP",
  si: "si_LK",
};

type BuildMetadataInput = {
  /** Active locale, e.g. "en" / "ja" / "si". */
  locale: string;
  /** Path under the locale, with leading slash. Use "" for home. */
  path: string;
  /** Translation namespace under `seo.*`, e.g. "home", "japaneseLanguage". */
  namespace: string;
  /** Optional OG image path (under /public). Defaults to /og-default.png. */
  ogImage?: string;
};

/** Build a complete <head> metadata object for a localized page:
 *  title, description, canonical URL, hreflang alternates for every
 *  locale (plus x-default), Open Graph, and Twitter Card.
 *
 *  Translation keys expected:
 *    seo.<namespace>.title
 *    seo.<namespace>.description
 */
export async function buildMetadata({
  locale,
  path,
  namespace,
  ogImage = "/og-default.png",
}: BuildMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `seo.${namespace}` });
  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;

  const ogUrl = `${SITE_URL}${ogImage}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    // Favicon handled by Next.js convention: app/icon.png + app/apple-icon.png
    // Auto-emits content-hashed URLs that bust browser favicon caches on
    // every file change.
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "JSLTCC",
      type: "website",
      locale: OG_LOCALE[locale] ?? "en_US",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: "JSLTCC" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

/** EducationalOrganization JSON-LD for the root layout. Gives Google
 *  rich-snippet eligibility (knowledge panel, course / school cards). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Japan Sri Lanka Technology & Cultural Centre",
    alternateName: "JSLTCC",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/jsltcc-logo.svg`,
    foundingDate: "2002",
    description:
      "Japanese language school and study-abroad consultancy in Sri Lanka. Official TOPJ examination centre, JLPT preparation, and university placements in Japan, UK, and Australia.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Colombo",
    },
    sameAs: [
      // Add real social profiles here as they're created:
      // "https://www.facebook.com/JSLTCC",
      // "https://www.instagram.com/jsltcc",
    ],
  };
}
