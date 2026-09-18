import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * The single source of truth for our public origin.
 *
 * It MUST be the host the site actually serves, which is www: the apex
 * 307s to https://www.jsltcc.com. Pointing canonicals, hreflang and the
 * sitemap at the apex meant every URL we handed Google was a redirect,
 * while the og:image (resolved from the real request host) said www —
 * two hostnames competing for the same pages.
 *
 * sitemap.ts and robots.ts import this rather than repeating the
 * expression, so the three can no longer disagree.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jsltcc.com"
).replace(/\/$/, "");

/**
 * The generated card from app/opengraph-image.tsx. Relative, so
 * metadataBase resolves it against SITE_URL and it stays correct if the
 * origin ever changes.
 *
 * The dimensions are repeated rather than imported from lib/og-image,
 * because that module imports ImageResponse from next/og — pulling the
 * edge image renderer into every page that builds metadata. They must
 * stay in step with `ogSize` there.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "JSLTCC — Japan Sri Lanka Technology & Cultural Centre",
};

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

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    // Favicon → Next.js convention: app/icon.png + app/apple-icon.png
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
      // Named explicitly. Next only falls back to app/opengraph-image.tsx
      // when a page declares no openGraph.images — and this function
      // declares an openGraph block, which suppressed the file-based
      // image on every page that used it. The result was that the ten
      // pages we manage had no social preview while the three we had
      // forgotten about did.
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
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
    // The centre has been in Gampaha since 2002. "Colombo" here was
    // placeholder text from the first build that outlived the rest of
    // the placeholders — and because it sat in structured data rather
    // than on the page, it told Google the school is in the wrong city
    // while the visible contact details said otherwise.
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gampaha Pradesiya Saba Building, Miriswatte, Mudungoda",
      addressLocality: "Gampaha",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    sameAs: [
      // Add real social profiles here as they're created:
      // "https://www.facebook.com/JSLTCC",
      // "https://www.instagram.com/jsltcc",
    ],
  };
}
