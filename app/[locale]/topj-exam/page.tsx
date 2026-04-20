"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ClipboardList,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Hand,
  FileText,
  CheckCircle,
  ArrowRight,
  Building2,
  Globe,
} from "lucide-react";

/* ─── Placeholder exam dates — replace with real dates each semester ─── */
const EXAM_DATES = [
  { value: "2026-05-10", label: "May 10, 2026" },
  { value: "2026-07-12", label: "July 12, 2026" },
  { value: "2026-09-13", label: "September 13, 2026" },
  { value: "2026-11-01", label: "November 1, 2026" },
];

export default function TopjExamPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <TopjContent />
      </main>
      <Footer />
    </>
  );
}

/* ─── Form state ─── */
interface FormData {
  nameEnglish: string;
  nationality: string;
  dob: string;
  schoolOrCompany: string;
  homeAddress: string;
  telephone: string;
  mobile: string;
  email: string;
  testLevel: string;
  examDate: string;
  writingHand: string;
  passportOrId: string;
}

const INITIAL: FormData = {
  nameEnglish: "",
  nationality: "",
  dob: "",
  schoolOrCompany: "",
  homeAddress: "",
  telephone: "",
  mobile: "",
  email: "",
  testLevel: "",
  examDate: "",
  writingHand: "",
  passportOrId: "",
};

function TopjContent() {
  const t = useTranslations("topjExam");
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/topj-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL);
    setSubmitted(false);
  };

  /* ─── Shared input styles ─── */
  const inputBase =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c0392b]/40 focus:border-[#c0392b] transition-all";
  const labelBase = "block text-sm font-semibold text-slate-700 mb-1.5";
  const sectionHeading =
    "flex items-center gap-2 text-lg font-bold text-[#0f172a] mb-6 pb-3 border-b border-slate-100";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0f172a] py-8 sm:py-12 px-4 overflow-hidden">
        {/* Hero background image — cropped from bottom via object-position */}
        <div className="absolute inset-0">
          <img
            src="/images/TOPJ%20Hero/Gemini_Generated_Image_cg0un9cg0un9cg0u.png"
            alt=""
            className="w-full h-full object-cover object-top"
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#0f172a]/45" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#f87171] text-sm font-semibold mb-5 tracking-wide"
          >
            <span className="w-1.5 h-1.5 bg-[#f87171] rounded-full animate-pulse" />
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-5"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {t("hero")}
          </motion.p>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="relative bg-slate-50 py-14 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            /* ── Success state ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
                {t("successTitle")}
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {t("successMessage")}
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-[#c0392b] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {t("submitAnother")}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
                  {t("formTitle")}
                </h2>
                <p className="text-slate-500 text-sm">{t("formSubtitle")}</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
              >
                {/* ── Section 1: Personal Information ── */}
                <div className="p-5 sm:p-10">
                  <h3 className={sectionHeading}>
                    <User size={20} className="text-[#c0392b]" />
                    {t("personalInfo")}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label className={labelBase}>{t("nameEnglish")}</label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          required
                          value={form.nameEnglish}
                          onChange={set("nameEnglish")}
                          placeholder={t("nameEnglishPlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className={labelBase}>{t("nationality")}</label>
                      <div className="relative">
                        <Globe
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          required
                          value={form.nationality}
                          onChange={set("nationality")}
                          placeholder={t("nationalityPlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>

                    {/* DOB */}
                    <div>
                      <label className={labelBase}>{t("dob")}</label>
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="date"
                          required
                          value={form.dob}
                          onChange={set("dob")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>

                    {/* School / Company */}
                    <div className="sm:col-span-2">
                      <label className={labelBase}>
                        {t("schoolOrCompany")}
                      </label>
                      <div className="relative">
                        <Building2
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          required
                          value={form.schoolOrCompany}
                          onChange={set("schoolOrCompany")}
                          placeholder={t("schoolOrCompanyPlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>

                    {/* Home Address */}
                    <div className="sm:col-span-2">
                      <label className={labelBase}>{t("homeAddress")}</label>
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="absolute left-3.5 top-3.5 text-slate-400"
                        />
                        <textarea
                          required
                          rows={2}
                          value={form.homeAddress}
                          onChange={set("homeAddress")}
                          placeholder={t("homeAddressPlaceholder")}
                          className={`${inputBase} pl-10 resize-none`}
                        />
                      </div>
                    </div>

                    {/* Passport / ID */}
                    <div className="sm:col-span-2">
                      <label className={labelBase}>{t("passportOrId")}</label>
                      <div className="relative">
                        <FileText
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          required
                          value={form.passportOrId}
                          onChange={set("passportOrId")}
                          placeholder={t("passportOrIdPlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div className="h-px bg-slate-100" />

                {/* ── Section 2: Contact Details ── */}
                <div className="p-5 sm:p-10">
                  <h3 className={sectionHeading}>
                    <Phone size={20} className="text-[#c0392b]" />
                    {t("contactDetails")}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Telephone */}
                    <div>
                      <label className={labelBase}>{t("telephone")}</label>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="tel"
                          value={form.telephone}
                          onChange={set("telephone")}
                          placeholder={t("telephonePlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className={labelBase}>{t("mobile")}</label>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="tel"
                          required
                          value={form.mobile}
                          onChange={set("mobile")}
                          placeholder={t("mobilePlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className={labelBase}>{t("email")}</label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={set("email")}
                          placeholder={t("emailPlaceholder")}
                          className={`${inputBase} pl-10`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div className="h-px bg-slate-100" />

                {/* ── Section 3: Exam Details ── */}
                <div className="p-5 sm:p-10">
                  <h3 className={sectionHeading}>
                    <Award size={20} className="text-[#c0392b]" />
                    {t("examDetails")}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Test Level */}
                    <div>
                      <label className={labelBase}>{t("testLevel")}</label>
                      <div className="relative">
                        <ClipboardList
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          required
                          value={form.testLevel}
                          onChange={set("testLevel")}
                          className={`${inputBase} pl-10 appearance-none cursor-pointer`}
                        >
                          <option value="">{t("selectLevel")}</option>
                          <option value="basic">
                            {t("testLevelBasic")}
                          </option>
                          <option value="junior">
                            {t("testLevelJunior")}
                          </option>
                          <option value="senior">
                            {t("testLevelSenior")}
                          </option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Exam Date */}
                    <div>
                      <label className={labelBase}>{t("examDate")}</label>
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          required
                          value={form.examDate}
                          onChange={set("examDate")}
                          className={`${inputBase} pl-10 appearance-none cursor-pointer`}
                        >
                          <option value="">{t("selectDate")}</option>
                          {EXAM_DATES.map((d) => (
                            <option key={d.value} value={d.value}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Writing Hand */}
                    <div className="sm:col-span-2">
                      <label className={labelBase}>{t("writingHand")}</label>
                      <div className="flex gap-3 sm:gap-4">
                        <label className="flex-1 relative cursor-pointer">
                          <input
                            type="radio"
                            name="writingHand"
                            value="right"
                            required
                            checked={form.writingHand === "right"}
                            onChange={set("writingHand")}
                            className="peer sr-only"
                          />
                          <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 transition-all peer-checked:border-[#c0392b] peer-checked:bg-red-50 peer-checked:text-[#c0392b] peer-checked:font-semibold hover:border-slate-300">
                            <Hand size={16} />
                            {t("rightHand")}
                          </div>
                        </label>
                        <label className="flex-1 relative cursor-pointer">
                          <input
                            type="radio"
                            name="writingHand"
                            value="left"
                            checked={form.writingHand === "left"}
                            onChange={set("writingHand")}
                            className="peer sr-only"
                          />
                          <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 transition-all peer-checked:border-[#c0392b] peer-checked:bg-red-50 peer-checked:text-[#c0392b] peer-checked:font-semibold hover:border-slate-300">
                            <Hand size={16} className="scale-x-[-1]" />
                            {t("leftHand")}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Submit ── */}
                <div className="p-5 sm:p-10 pt-0">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all text-sm shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {t("submitting")}
                      </>
                    ) : (
                      <>
                        {t("submit")}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
