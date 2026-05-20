import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsltcc.com"
).replace(/\/$/, "");

/** All public routes under app/[locale]/. Update when adding new pages. */
const ROUTES = [
  "",
  "/about",
  "/about/privacy-policy",
  "/activities",
  "/contact",
  "/japanese-language",
  "/study-in-australia",
  "/study-in-japan",
  "/study-in-united-kingdom",
  "/topj-exam",
  "/visa-services",
] as const;

const PRIORITY: Record<string, number> = {
  "": 1.0,
  "/japanese-language": 0.9,
  "/topj-exam": 0.9,
  "/study-in-japan": 0.9,
  "/study-in-united-kingdom": 0.8,
  "/study-in-australia": 0.8,
  "/visa-services": 0.7,
  "/about": 0.6,
  "/about/privacy-policy": 0.3,
  "/activities": 0.6,
  "/contact": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: PRIORITY[route] ?? 0.5,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
        ),
      },
    }))
  );
}
