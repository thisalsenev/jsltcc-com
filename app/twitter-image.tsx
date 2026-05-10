import { renderOgImage, ogSize, ogContentType, ogAlt } from "@/lib/og-image";

export const runtime = "edge";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return renderOgImage();
}
