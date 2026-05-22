"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";
import HeaderSwarm from "./HeaderSwarm";

const localeLabels: Record<string, string> = {
  en: "EN",
  ja: "JP",
  si: "සිං",
};

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/japanese-language", label: t("japaneseLanguage") },
    { href: "/study-in-japan", label: t("studyInJapan") },
    { href: "/study-in-united-kingdom", label: t("studyInUK") },
    { href: "/topj-exam", label: t("topjExam") },
    { href: "/contact", label: t("contact") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 transition-shadow duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white/95"}`}>
      {/* Swarm + vignette in their own clipped box so the mobile drawer (which
          drops below the header) isn't truncated by overflow-hidden. */}
      <div className="absolute inset-0 overflow-hidden isolate pointer-events-none" aria-hidden>
        <HeaderSwarm />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, rgba(255,255,255,1) 100%)",
          }}
        />
      </div>

      <div className="relative flex items-center h-full" style={{ zIndex: 3 }}>
      {/* LEFT — logo */}
      <a href={`/${locale}`} className="flex items-center px-4 shrink-0 h-full">
        <div className="relative w-16 h-16 shrink-0">
          <Image
            src="/images/logo/jsltcc-logo.png"
            alt="JSLTCC — Japan Sri Lanka Technology & Cultural Centre logo"
            fill
            className="object-contain rounded-lg"
            sizes="64px"
            priority
          />
        </div>
      </a>

      {/* RIGHT — nav */}
      <div className="flex-1 flex items-center justify-between px-4 h-full">
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className="text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/60 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          {/* Student Portal — animated aurora pill */}
          <a
            href="https://student.jsltcc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 animate-portal-aurora text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md ring-1 ring-emerald-300/40 hover:scale-105 transition-transform"
          >
            <GraduationCap size={15} className="shrink-0" />
            <span>{t("studentPortal")}</span>
          </a>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-slate-700 hover:text-slate-900 text-sm font-medium px-3 py-1.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/60 transition-all"
            >
              <Globe size={14} />
              <span>{localeLabels[locale]}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden min-w-[100px]">
                {Object.entries(localeLabels).map(([loc, label]) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      loc === locale ? "text-[#c0392b] font-semibold" : "text-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA — registration is the main conversion target. The
              previous "Enquire Now" CTA pointed at /contact; the Contact
              page is still reachable via the nav link above. */}
          <a
            href={`/${locale}/register`}
            className="hidden sm:inline-flex items-center bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-md"
          >
            {t("register")}
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden text-slate-700 p-2.5 -mr-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 active:bg-white/90"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 xl:hidden bg-[#0f172a] border-t border-white/10 px-4 py-3 space-y-0.5 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Student Portal — animated aurora pill (mobile) */}
          <a
            href="https://student.jsltcc.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 animate-portal-aurora text-white text-[15px] font-semibold px-4 py-3.5 rounded-full shadow-md ring-1 ring-emerald-300/40 mb-2"
          >
            <GraduationCap size={17} className="shrink-0" />
            <span>{t("studentPortal")}</span>
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white active:bg-white/15 hover:bg-white/10 px-4 py-3.5 rounded-lg text-[15px] font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 mt-1 border-t border-white/10">
            <a
              href={`/${locale}/register`}
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#c0392b] hover:bg-[#e74c3c] active:bg-[#a93226] text-white text-[15px] font-semibold px-4 py-3.5 rounded-xl transition-colors mt-1"
            >
              {t("register")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
