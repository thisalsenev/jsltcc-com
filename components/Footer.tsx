"use client";

import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");
  const locale = useLocale();

  const links = [
    { href: "/", label: nav("home") },
    { href: "/about", label: nav("about") },
    { href: "/japanese-language", label: nav("japaneseLanguage") },
    { href: "/study-in-japan", label: nav("studyInJapan") },
    { href: "/study-in-australia", label: nav("studyInAustralia") },
    { href: "/visa-services", label: nav("visaServices") },
    { href: "/activities", label: nav("activities") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="bg-[#080f1e] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/logo/JSLTCC LOGO.png"
                  alt="JSLTCC Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm">JSLTCC</div>
                <div className="text-slate-500 text-xs">Japan Sri Lanka Tech & Cultural</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">{t("tagline")}</p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#c0392b] rounded-lg flex items-center justify-center transition-colors text-white"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#c0392b] rounded-lg flex items-center justify-center transition-colors text-white"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">{t("contactInfo")}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={14} className="text-[#c0392b] mt-0.5 shrink-0" />
                <span>{contact("address")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-[#c0392b] shrink-0" />
                <a href={`tel:${contact("phone_number")}`} className="hover:text-white transition-colors">
                  {contact("phone_number")}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-[#c0392b] shrink-0" />
                <a href={`mailto:${contact("email_address")}`} className="hover:text-white transition-colors">
                  {contact("email_address")}
                </a>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><a href={`/${locale}/japanese-language`} className="hover:text-white transition-colors">Japanese Language (JLPT, TOPJ, NAT)</a></li>
              <li><a href={`/${locale}/study-in-japan`} className="hover:text-white transition-colors">Study in Japan</a></li>
              <li><a href={`/${locale}/study-in-australia`} className="hover:text-white transition-colors">Study in Australia</a></li>
              <li><a href={`/${locale}/visa-services`} className="hover:text-white transition-colors">Student Visa</a></li>
              <li><a href={`/${locale}/visa-services`} className="hover:text-white transition-colors">Working Visa</a></li>
              <li><a href={`/${locale}/visa-services`} className="hover:text-white transition-colors">Training Visa</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {new Date().getFullYear()} JSLTCC. {t("rights")}</span>
          <span className="text-slate-600">Japan Sri Lanka Technology & Cultural Centre</span>
        </div>
      </div>
    </footer>
  );
}
