import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/visa-services",
    namespace: "visaServices",
  });
}

export default function VisaServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
