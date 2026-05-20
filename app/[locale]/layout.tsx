import { Inter, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LoadingScreen from "@/components/LoadingScreen";
import MetaPixel from "@/components/MetaPixel";
import { organizationJsonLd } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const orgSchema = organizationJsonLd();

  return (
    <html lang={locale} className={`scroll-smooth ${instrumentSerif.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        {/* Meta Pixel — fires PageView on initial load + every route change */}
        <MetaPixel />
        {/* EducationalOrganization schema — global, server-rendered for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <LoadingScreen />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
