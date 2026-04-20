"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";

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
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
    <header className={`fixed top-0 left-0 right-0 z-50 flex items-center h-16 transition-all duration-300 overflow-hidden ${isScrolled ? "bg-[#0f172a] shadow-lg" : "bg-[#0f172a]/95 backdrop-blur-sm"}`}>

      {/* ── Floating pills ── */}
      <style>{`
        @keyframes pill1 { 0%,100%{transform:translateX(0px) translateY(0px)} 40%{transform:translateX(18px) translateY(-6px)} 70%{transform:translateX(-10px) translateY(4px)} }
        @keyframes pill2 { 0%,100%{transform:translateX(0px) translateY(0px)} 35%{transform:translateX(-20px) translateY(5px)} 65%{transform:translateX(12px) translateY(-4px)} }
        @keyframes pill3 { 0%,100%{transform:translateX(0px) translateY(0px)} 45%{transform:translateX(14px) translateY(7px)} 75%{transform:translateX(-8px) translateY(-5px)} }
        @keyframes pill4 { 0%,100%{transform:translateX(0px) translateY(0px)} 30%{transform:translateX(-16px) translateY(-4px)} 60%{transform:translateX(10px) translateY(6px)} }
        @keyframes pill5 { 0%,100%{transform:translateX(0px) translateY(0px)} 50%{transform:translateX(20px) translateY(-3px)} 80%{transform:translateX(-6px) translateY(5px)} }
        @keyframes pill6 { 0%,100%{transform:translateX(0px) translateY(0px)} 38%{transform:translateX(-14px) translateY(6px)} 68%{transform:translateX(16px) translateY(-5px)} }
      `}</style>

      <span aria-hidden style={{position:"absolute",top:"12px",left:"8%",  width:"90px", height:"22px",borderRadius:"9999px",background:"rgba(192,57,43,0.18)", border:"1px solid rgba(192,57,43,0.25)",animation:"pill1 22s ease-in-out infinite",willChange:"transform"}} />
      <span aria-hidden style={{position:"absolute",top:"20px",left:"22%", width:"120px",height:"18px",borderRadius:"9999px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",animation:"pill2 28s ease-in-out infinite",willChange:"transform"}} />
      <span aria-hidden style={{position:"absolute",top:"8px", left:"42%", width:"70px", height:"26px",borderRadius:"9999px",background:"rgba(192,57,43,0.10)",border:"1px solid rgba(192,57,43,0.18)",animation:"pill3 19s ease-in-out infinite",willChange:"transform"}} />
      <span aria-hidden style={{position:"absolute",top:"22px",left:"58%", width:"100px",height:"20px",borderRadius:"9999px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.10)",animation:"pill4 32s ease-in-out infinite",willChange:"transform"}} />
      <span aria-hidden style={{position:"absolute",top:"10px",left:"74%", width:"80px", height:"24px",borderRadius:"9999px",background:"rgba(192,57,43,0.13)",border:"1px solid rgba(192,57,43,0.20)",animation:"pill5 24s ease-in-out infinite",willChange:"transform"}} />
      <span aria-hidden style={{position:"absolute",top:"18px",left:"88%", width:"110px",height:"19px",borderRadius:"9999px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.11)",animation:"pill6 27s ease-in-out infinite",willChange:"transform"}} />

      {/* LEFT — logo */}
      <a href={`/${locale}`} className="flex items-center px-4 shrink-0 h-full">
        <div className="relative w-16 h-16 shrink-0">
          <Image
            src="/images/logo/Untitled (1).png"
            alt="JSLTCC Logo"
            fill
            className="object-contain rounded-lg"
            sizes="64px"
            priority
          />
        </div>
      </a>

      {/* RIGHT — nav */}
      <div className="flex-1 flex items-center justify-between px-4 h-full">
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className="text-slate-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10 active:bg-white/15 transition-all"
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

          {/* CTA */}
          <a
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            {t("enquireNow")}
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden text-white p-2.5 -mr-1 rounded-lg active:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 xl:hidden bg-[#0f172a] border-t border-white/10 px-4 py-3 space-y-0.5 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
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
              href={`/${locale}/contact`}
              className="block text-center bg-[#c0392b] hover:bg-[#e74c3c] active:bg-[#a93226] text-white text-[15px] font-semibold px-4 py-3.5 rounded-xl transition-colors mt-1"
            >
              {t("enquireNow")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
