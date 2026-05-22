import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register for Japanese Classes — JSLTCC",
  description:
    "Register for in-person JLPT N5, N4, and N3 Japanese language classes at JSLTCC Colombo. Course fee LKR 35,000. Pick a level, fill in a few details, and we'll save your seat for the next intake.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
