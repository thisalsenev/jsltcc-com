import RegisterClient from "./RegisterClient";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/register", namespace: "register" });
}

export default function RegisterPage() {
  return <RegisterClient />;
}
