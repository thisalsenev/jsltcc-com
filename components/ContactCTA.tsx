"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ContactCTA() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [program, setProgram] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  // Pre-select program from URL param e.g. ?program=japanese
  useEffect(() => {
    const p = searchParams.get("program");
    if (p) {
      setProgram(p);
      // Scroll form into view smoothly
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#0f172a]" id="contact-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-3">
              Free Consultation
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
              {t("title")}
            </h2>
            <p className="text-slate-400 mb-10">{t("subtitle")}</p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#c0392b]" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Address</div>
                  <div className="text-slate-400 text-sm">{t("address")}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#c0392b]" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Phone</div>
                  <a href={`tel:${t("phone_number")}`} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {t("phone_number")}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#c0392b]" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Email</div>
                  <a href={`mailto:${t("email_address")}`} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {t("email_address")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-2">Enquiry Sent!</h3>
                <p className="text-slate-500 text-sm">Thank you! We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Send an Enquiry</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t("name")}</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                    placeholder="John Silva"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("email")}</label>
                    <input
                      type="email"
                      required
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                      placeholder="john@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("phone")}</label>
                    <input
                      type="tel"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                      placeholder="+94 77 000 0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t("program")}</label>
                  <select
                    required
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b] bg-white"
                  >
                    <option value="">Select a program...</option>
                    <option value="japanese">{t("programOptions.japanese")}</option>
                    <option value="studyJapan">{t("programOptions.studyJapan")}</option>
                    <option value="studyUK">{t("programOptions.studyUK")}</option>
                    <option value="studentVisa">Student Visa</option>
                    <option value="workingVisa">Working Visa</option>
                    <option value="trainingVisa">Training Visa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message (optional)</label>
                  <textarea
                    rows={3}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b] resize-none"
                    placeholder="Any specific questions or requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#c0392b] hover:bg-[#e74c3c] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send size={16} />
                  {t("send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
