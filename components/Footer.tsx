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

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.49 2.027 7.8L0 32l8.433-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.773-1.853l-.487-.29-5.013 1.193 1.22-4.88-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.293-9.867c-.4-.2-2.363-1.163-2.73-1.297-.367-.133-.633-.2-.9.2-.267.4-1.033 1.297-1.267 1.563-.233.267-.467.3-.867.1-.4-.2-1.687-.623-3.213-1.98-1.187-1.057-1.99-2.363-2.223-2.763-.233-.4-.025-.617.175-.817.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.323-.78-.653-.673-.9-.687-.233-.013-.5-.017-.767-.017-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.307 6.833 6.037.957.413 1.703.66 2.283.843.96.307 1.833.263 2.523.16.77-.113 2.363-.967 2.697-1.9.333-.933.333-1.733.233-1.9-.097-.167-.363-.267-.763-.467z" />
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
    { href: "/study-in-united-kingdom", label: nav("studyInUK") },
    { href: "/topj-exam", label: nav("topjExam") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="bg-[#080f1e] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-14 shrink-0">
                <Image
                  src="/images/logo/Untitled (1).png"
                  alt="JSLTCC Logo"
                  fill
                  className="object-contain rounded-sm"
                  sizes="48px"
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
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-white"
                style={{ background: "#1877F2" }}
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-white"
                style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://wa.me/94777226726"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-white"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">{t("quickLinks")}</h4>
            <ul className="space-y-1 sm:space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    className="text-sm hover:text-white transition-colors inline-block py-1 sm:py-0"
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
              <li><a href={`/${locale}/study-in-united-kingdom`} className="hover:text-white transition-colors">Study in United Kingdom</a></li>
              <li><a href={`/${locale}/topj-exam`} className="hover:text-white transition-colors">TOPJ Exam Registration</a></li>
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
