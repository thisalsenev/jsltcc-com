import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/japanese-language",
    namespace: "japaneseLanguage",
  });
}

export default function JapaneseLanguageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
