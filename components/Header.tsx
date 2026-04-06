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
    { href: "/study-in-australia", label: t("studyInAustralia") },
    { href: "/visa-services", label: t("visaServices") },
    { href: "/activities", label: t("activities") },
    { href: "/contact", label: t("contact") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f172a] shadow-lg py-2"
          : "bg-[#0f172a]/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/images/logo/JSLTCC LOGO.png"
                alt="JSLTCC Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">JSLTCC</div>
              <div className="text-slate-400 text-xs leading-tight">Japan Sri Lanka Tech & Cultural</div>
            </div>
          </a>

          {/* Desktop Nav */}
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

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium px-2 py-1.5 rounded-md hover:bg-white/10 transition-all"
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
              className="xl:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#0f172a] border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-md text-sm font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
            <a
              href={`/${locale}/contact`}
              className="block text-center bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors mt-2"
            >
              {t("enquireNow")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
