import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/topj-exam",
    namespace: "topjExam",
  });
}

export default function TopjExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
