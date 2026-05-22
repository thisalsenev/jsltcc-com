"use client";

import { useRef, useState, type CSSProperties } from "react";
import ArrowsBg from "./ArrowsBg";

// Design tokens — ported from the Claude Design handoff (page.jsx).
const C = {
  bg: "#0e0a2e",
  bg2: "#15102f",
  surface: "rgba(255, 255, 255, 0.045)",
  surfaceHi: "rgba(255, 255, 255, 0.08)",
  border: "rgba(255, 255, 255, 0.10)",
  borderHi: "rgba(255, 255, 255, 0.18)",
  text: "#ffffff",
  textDim: "rgba(235, 230, 255, 0.62)",
  textMute: "rgba(235, 230, 255, 0.42)",
  magenta: "#d859ef",
  blue: "#5670ff",
  cta: "#ffe24a",
  ctaInk: "#0e0a2e",
  ok: "#4ade80",
  err: "#ff6b8a",
};

type Level = "N5" | "N4" | "N3";
const SOURCE_OPTIONS = [
  "Social Media (Facebook / Instagram / TikTok)",
  "Friend or family",
  "Google Search",
  "Walked past our centre",
];

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  level: Level | "";
  source: string;
  website: string; // honeypot
};

const EMPTY_FORM: FormState = {
  fullName: "",
  phone: "",
  email: "",
  level: "",
  source: "",
  website: "",
};

export default function RegisterClient() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; level: Level; phone: string; email: string } | null>(null);
  const formRef = useRef<HTMLElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Partial<Record<keyof FormState, string>> => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{7,12}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.level) e.level = "Pick a level to continue";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          level: form.level,
          source: form.source || undefined,
          website: form.website, // honeypot
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data?.error || "Something went wrong — please try again.");
        return;
      }
      setSubmitted({
        name: form.fullName,
        level: form.level as Level,
        phone: form.phone,
        email: form.email,
      });
      // Track lead in Meta Pixel if available (deployed on jsltcc.com).
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitError(null);
    setSubmitted(null);
  };

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: "100vh",
      }}
    >
      {submitted ? (
        <SuccessState data={submitted} onReset={reset} />
      ) : (
        <>
          <Hero />
          <ContentColumn>
            <InfoCards />
            <CtaBlock onCta={scrollToForm} />
            <FormSection
              ref={formRef}
              form={form}
              errors={errors}
              submitting={submitting}
              submitError={submitError}
              onChange={set}
              onSubmit={handleSubmit}
            />
          </ContentColumn>
        </>
      )}
    </div>
  );
}

/* ============================================================
 *  Layout wrapper — keeps content focused at ~600px on desktop
 * ============================================================ */
function ContentColumn({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        background: C.bg2,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
 *  Hero — branded badge + title + paragraph over the arrows BG
 * ============================================================ */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`,
        minHeight: 620,
      }}
    >
      <ArrowsBg />

      {/* Soft vignette behind the headline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 75% 50% at 30% 35%, rgba(14, 10, 46, 0.85) 0%, rgba(14, 10, 46, 0.45) 45%, transparent 75%),
            linear-gradient(180deg, rgba(14, 10, 46, 0.55) 0%, transparent 18%, transparent 82%, rgba(14, 10, 46, 0.65) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 600,
          margin: "0 auto",
          padding: "64px 22px 36px",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.magenta}, ${C.blue})`,
              display: "grid",
              placeItems: "center",
              fontFamily: '"Noto Serif JP", serif',
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.02em",
            }}
          >
            日
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "0.02em" }}>
              JSLTCC
            </span>
            <span
              style={{
                fontSize: 10.5,
                color: C.textMute,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Japanese language school
            </span>
          </div>
        </div>

        <div style={{ position: "relative", maxWidth: 480 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px 5px 8px",
              borderRadius: 999,
              background: "rgba(216, 89, 239, 0.14)",
              border: "1px solid rgba(216, 89, 239, 0.32)",
              color: "#f3c7fb",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.magenta,
                boxShadow: `0 0 8px ${C.magenta}`,
              }}
            />
            2026 INTAKE · NOW OPEN
          </span>

          <h1
            style={{
              fontFamily: '"Bricolage Grotesque", "Plus Jakarta Sans", sans-serif',
              fontSize: "clamp(38px, 5.5vw, 56px)",
              lineHeight: 1.02,
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.025em",
              margin: "0 0 18px",
              textWrap: "balance",
            }}
          >
            Register for
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #ffffff 0%, #f0d9ff 40%, #c5d0ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Japanese classes
            </span>
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: C.textDim,
              margin: 0,
              maxWidth: 380,
              textWrap: "pretty",
            }}
          >
            Welcome — we&apos;re glad you&apos;re here. Pick a level, fill in a few details, and we&apos;ll save your seat for the next session.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  Info cards — fee, format, schedule
 * ============================================================ */
function InfoCards() {
  return (
    <section
      style={{
        padding: "28px 18px 8px",
        background: C.bg2,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Fee card */}
      <article
        style={{
          position: "relative",
          padding: "18px 20px 20px",
          background: `linear-gradient(135deg, ${C.magenta}1a, ${C.blue}10)`,
          border: `1px solid ${C.magenta}38`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -8,
            top: -16,
            fontFamily: '"Noto Serif JP", serif',
            fontSize: 110,
            fontWeight: 700,
            color: C.text,
            opacity: 0.04,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          円
        </div>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: C.textMute,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Course fee
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textDim, letterSpacing: "0.05em" }}>
            LKR
          </span>
          <span
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 38,
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            35,000
          </span>
        </div>
        <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.4 }}>
          Full N5 / N4 / N3 course
        </div>
      </article>

      <InfoCard
        label="Class format"
        title="In-person classes"
        sub="Held at our Colombo centre"
        tint={C.blue}
        icon={<IconPin />}
      />
      <InfoCard
        label="Class schedule"
        title="Two daily sessions"
        sub="N5: Morning · N4: Afternoon"
        tint={C.magenta}
        icon={<IconSunMoon />}
      />
    </section>
  );
}

function InfoCard({
  label,
  title,
  sub,
  tint,
  icon,
}: {
  label: string;
  title: string;
  sub: string;
  tint: string;
  icon: React.ReactNode;
}) {
  return (
    <article
      style={{
        position: "relative",
        padding: "16px 18px",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        display: "flex",
        gap: 16,
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(180deg, ${tint}, transparent)`,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${tint}22, ${tint}10)`,
          border: `1px solid ${tint}33`,
          display: "grid",
          placeItems: "center",
          color: tint,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: C.textMute,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: C.text,
            marginBottom: 2,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.4 }}>{sub}</div>
      </div>
    </article>
  );
}

function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.6" />
    </svg>
  );
}
function IconSunMoon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
    </svg>
  );
}

/* ============================================================
 *  Primary CTA — scrolls to the form
 * ============================================================ */
function CtaBlock({ onCta }: { onCta: () => void }) {
  return (
    <section style={{ padding: "20px 18px 32px", background: C.bg2 }}>
      <button
        type="button"
        onClick={onCta}
        style={{
          width: "100%",
          padding: "18px 22px",
          background: C.cta,
          color: C.ctaInk,
          border: "none",
          borderRadius: 16,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          boxShadow: `0 8px 30px -8px ${C.cta}88, inset 0 -2px 0 rgba(0,0,0,0.08)`,
          letterSpacing: "-0.005em",
        }}
      >
        <span>Register now</span>
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "rgba(14, 10, 46, 0.08)",
            display: "grid",
            placeItems: "center",
            marginRight: -6,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ctaInk} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
      <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, color: C.textMute }}>
        Takes about a minute · We&apos;ll reply within 1–2 days
      </div>
    </section>
  );
}

/* ============================================================
 *  Form section
 * ============================================================ */
function FormSection({
  ref,
  form,
  errors,
  submitting,
  submitError,
  onChange,
  onSubmit,
}: {
  ref: React.Ref<HTMLElement>;
  form: FormState;
  errors: Partial<Record<keyof FormState, string>>;
  submitting: boolean;
  submitError: string | null;
  onChange: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <section
      ref={ref}
      id="register"
      style={{
        padding: "28px 20px 40px",
        background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            fontSize: 11,
            color: C.magenta,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Step 1 of 1
        </div>
        <h2
          style={{
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontSize: 26,
            fontWeight: 700,
            color: C.text,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Your details
        </h2>
        <p style={{ marginTop: 8, fontSize: 14, color: C.textDim, lineHeight: 1.5 }}>
          Just five quick fields. We&apos;ll never share your contact info.
        </p>
      </div>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }} noValidate>
        {/* Honeypot — hidden from humans, bots fill it */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => onChange("website", e.target.value)}
            />
          </label>
        </div>

        <Field label="Full name" required error={errors.fullName}>
          <Input
            value={form.fullName}
            onChange={(v) => onChange("fullName", v)}
            placeholder="e.g. Kavindi Perera"
            autoComplete="name"
            error={!!errors.fullName}
          />
        </Field>

        <Field label="Phone number" required error={errors.phone}>
          <Input
            value={form.phone}
            onChange={(v) => onChange("phone", v)}
            placeholder="077 123 4567"
            inputMode="tel"
            autoComplete="tel"
            error={!!errors.phone}
          />
        </Field>

        <Field label="Email" required error={errors.email}>
          <Input
            value={form.email}
            onChange={(v) => onChange("email", v)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
            type="email"
            error={!!errors.email}
          />
        </Field>

        <LevelControl
          value={form.level}
          onChange={(v) => onChange("level", v)}
          error={errors.level}
        />

        <Field label="How did you hear about us?" optional>
          <SelectInput
            value={form.source}
            onChange={(v) => onChange("source", v)}
            placeholder="Choose one…"
            options={SOURCE_OPTIONS}
          />
        </Field>

        {submitError && (
          <div
            style={{
              padding: "12px 14px",
              background: "rgba(255, 107, 138, 0.10)",
              border: `1px solid ${C.err}55`,
              borderRadius: 12,
              color: C.err,
              fontSize: 13,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              lineHeight: 1.4,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <span>{submitError}</span>
          </div>
        )}

        <SubmitButton submitting={submitting} />
      </form>
    </section>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: C.text,
          marginBottom: 8,
          letterSpacing: "-0.005em",
        }}
      >
        {label}
        {required && <span style={{ color: C.magenta, marginLeft: 4 }}>*</span>}
        {optional && (
          <span style={{ color: C.textMute, marginLeft: 6, fontWeight: 500, fontSize: 12 }}>
            · optional
          </span>
        )}
      </label>
      {children}
      {error && (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            color: C.err,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  inputMode,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
  inputMode?: "tel" | "email" | "text" | "numeric";
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? C.magenta : error ? `${C.err}66` : C.border;
  const ring: CSSProperties = focused
    ? { boxShadow: `0 0 0 4px ${C.magenta}1a` }
    : {};
  return (
    <input
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "15px 16px",
        background: C.surface,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 14,
        color: C.text,
        fontSize: 15,
        fontFamily: "inherit",
        outline: "none",
        letterSpacing: "-0.005em",
        transition: "border-color 0.18s, box-shadow 0.18s",
        ...ring,
      }}
    />
  );
}

function SelectInput({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "15px 44px 15px 16px",
          background: C.surface,
          border: `1.5px solid ${C.border}`,
          borderRadius: 14,
          color: value ? C.text : C.textMute,
          fontSize: 15,
          fontFamily: "inherit",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
          cursor: "pointer",
          letterSpacing: "-0.005em",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: C.bg2, color: C.text }}>
            {o}
          </option>
        ))}
      </select>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={C.textDim}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function LevelControl({
  value,
  onChange,
  error,
}: {
  value: Level | "";
  onChange: (v: Level) => void;
  error?: string;
}) {
  const levels: { key: Level; label: string; sub: string; glyph: string }[] = [
    { key: "N5", label: "N5", sub: "Beginner", glyph: "五" },
    { key: "N4", label: "N4", sub: "Elementary", glyph: "四" },
    { key: "N3", label: "N3", sub: "Intermediate", glyph: "三" },
  ];

  return (
    <Field label="Preferred level" required error={error}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {levels.map((l) => {
          const active = value === l.key;
          return (
            <button
              key={l.key}
              type="button"
              onClick={() => onChange(l.key)}
              style={{
                padding: "14px 8px 12px",
                borderRadius: 14,
                background: active
                  ? `linear-gradient(160deg, ${C.magenta}22, ${C.blue}1f)`
                  : C.surface,
                border: `1.5px solid ${active ? C.magenta : error ? `${C.err}66` : C.border}`,
                color: C.text,
                fontFamily: "inherit",
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
                transition: "all 0.18s ease",
                boxShadow: active ? `0 0 0 4px ${C.magenta}1a` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: '"Noto Serif JP", serif',
                  fontSize: 13,
                  color: active ? C.magenta : C.textMute,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {l.glyph}
              </div>
              <div
                style={{
                  fontFamily: '"Bricolage Grotesque", sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {l.label}
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  color: active ? C.text : C.textDim,
                  marginTop: 5,
                  letterSpacing: "0.02em",
                }}
              >
                {l.sub}
              </div>
              {active && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: C.magenta,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      style={{
        marginTop: 4,
        width: "100%",
        padding: "18px 22px",
        background: submitting ? "#fff3a0" : C.cta,
        color: C.ctaInk,
        border: "none",
        borderRadius: 16,
        fontSize: 16,
        fontWeight: 700,
        fontFamily: "inherit",
        letterSpacing: "-0.005em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        cursor: submitting ? "wait" : "pointer",
        boxShadow: `0 8px 30px -8px ${C.cta}88, inset 0 -2px 0 rgba(0,0,0,0.08)`,
        transition: "transform 0.1s, background 0.18s",
      }}
    >
      {submitting ? (
        <>
          <Spinner />
          Submitting…
        </>
      ) : (
        <>
          Submit registration
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ctaInk} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes regSpin { to { transform: rotate(360deg); } }`}</style>
      <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: "regSpin 0.9s linear infinite" }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(14,10,46,0.2)" strokeWidth="3" />
        <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={C.ctaInk} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </>
  );
}

/* ============================================================
 *  Success state
 * ============================================================ */
function SuccessState({
  data,
  onReset,
}: {
  data: { name: string; level: Level; phone: string; email: string };
  onReset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 22px",
      }}
    >
      <style>{`
        @keyframes regPingRing { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes regDrawCheck { to { stroke-dashoffset: 0; } }
        @keyframes regFadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        style={{
          maxWidth: 480,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          animation: "regFadeInUp 0.5s ease",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${C.magenta}44, ${C.blue}33 60%, transparent 75%)`,
            display: "grid",
            placeItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `2px solid ${C.magenta}66`,
              animation: "regPingRing 2s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `2px solid ${C.blue}66`,
              animation: "regPingRing 2s ease-out 0.6s infinite",
            }}
          />
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.magenta}, ${C.blue})`,
              display: "grid",
              placeItems: "center",
              boxShadow: `0 12px 40px -10px ${C.magenta}88`,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M5 12l5 5L20 7"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "regDrawCheck 0.55s ease 0.15s forwards",
                }}
              />
            </svg>
          </div>
        </div>

        <div
          style={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: 18,
            color: C.textDim,
            marginBottom: 8,
            letterSpacing: "0.04em",
          }}
        >
          ありがとうございます
        </div>

        <h2
          style={{
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontSize: 28,
            fontWeight: 700,
            color: C.text,
            letterSpacing: "-0.025em",
            margin: "0 0 14px",
            lineHeight: 1.1,
          }}
        >
          Thank you, {data.name.split(" ")[0] || "friend"}!
        </h2>

        <p
          style={{
            fontSize: 15,
            color: C.textDim,
            lineHeight: 1.55,
            maxWidth: 380,
            textWrap: "pretty",
            margin: "0 0 24px",
          }}
        >
          We&apos;ve received your registration and will contact you within{" "}
          <strong style={{ color: C.text, fontWeight: 600 }}>1–2 days</strong>.
        </p>

        <div
          style={{
            width: "100%",
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "16px 18px",
            textAlign: "left",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 10.5,
              color: C.textMute,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Confirmation
          </div>
          <ReceiptRow label="Name" value={data.name} />
          <ReceiptRow label="Level" value={data.level} accent />
          <ReceiptRow label="Phone" value={data.phone} />
          <ReceiptRow label="Email" value={data.email} last />
        </div>

        <button
          type="button"
          onClick={onReset}
          style={{
            padding: "12px 22px",
            background: "transparent",
            border: `1.5px solid ${C.border}`,
            color: C.textDim,
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Register another person
        </button>
      </div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
  last,
  accent,
}: {
  label: string;
  value: string;
  last?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 0",
        borderBottom: last ? "none" : `1px solid ${C.border}`,
        gap: 12,
      }}
    >
      <span style={{ fontSize: 12.5, color: C.textMute, flexShrink: 0 }}>{label}</span>
      <span
        style={{
          fontSize: 13.5,
          color: accent ? C.magenta : C.text,
          fontWeight: accent ? 700 : 500,
          textAlign: "right",
          wordBreak: "break-word",
          minWidth: 0,
        }}
      >
        {value || "—"}
      </span>
    </div>
  );
}
