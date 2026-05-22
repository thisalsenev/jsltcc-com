import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const VALID_LEVELS = ["N5", "N4", "N3"] as const;
const VALID_SOURCES = [
  "Social Media (Facebook / Instagram / TikTok)",
  "Friend or family",
  "Google Search",
  "Walked past our centre",
];

type Level = (typeof VALID_LEVELS)[number];

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const body = raw as Record<string, unknown>;

  // Honeypot — bots fill hidden fields, humans don't. Silently accept so
  // attackers can't tell the form rejected them.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim().slice(0, 200) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const level = typeof body.level === "string" ? body.level.trim() : "";
  const sourceInput = typeof body.source === "string" ? body.source.trim().slice(0, 100) : "";

  if (!fullName) return NextResponse.json({ error: "Full name is required" }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 12) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (!(VALID_LEVELS as readonly string[]).includes(level)) {
    return NextResponse.json({ error: "Please pick a level" }, { status: 400 });
  }
  const source = sourceInput && VALID_SOURCES.includes(sourceInput) ? sourceInput : null;

  let sb;
  try {
    sb = supabaseAdmin();
  } catch (e) {
    console.error("[register] supabase config missing", e);
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const userAgent = req.headers.get("user-agent")?.slice(0, 400) ?? null;

  const { error } = await sb.from("course_registrations").insert({
    full_name: fullName,
    phone,
    email,
    preferred_level: level as Level,
    source,
    user_agent: userAgent,
  });

  if (error) {
    console.error("[register] insert failed", error);
    return NextResponse.json({ error: "Failed to save — please try again" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
