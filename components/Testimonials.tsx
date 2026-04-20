"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kasuni Perera",
    country: "Sri Lanka → Tokyo",
    program: "Study in Japan",
    quote: "JSLTCC made my dream of studying in Japan a reality. From the language classes to the visa support, every step was handled professionally. I'm now studying at a top language school in Tokyo!",
    initials: "KP",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Ruwan Silva",
    country: "Sri Lanka → Osaka",
    program: "Japanese Language + Study Placement",
    quote: "I had zero Japanese knowledge when I joined. After one year with JSLTCC, I passed JLPT N3 and got placed at an Osaka university. The teachers are amazing and genuinely care about your progress.",
    initials: "RS",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Dilani Fernando",
    country: "Sri Lanka → Melbourne",
    program: "Study in Australia",
    quote: "The team helped me navigate the entire Australian student visa process without any stress. I'm now studying nursing in Melbourne and couldn't be happier with how smoothly it all went.",
    initials: "DF",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Tharaka Jayawardena",
    country: "Sri Lanka → Fukuoka",
    program: "Working Visa",
    quote: "JSLTCC helped me secure a working visa for Japan faster than I expected. Their knowledge of Japanese immigration requirements is unmatched. Highly recommend to anyone looking to work in Japan.",
    initials: "TJ",
    color: "bg-amber-100 text-amber-600",
  },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-5 sm:p-7 border border-slate-100 hover:border-[#c0392b]/20 hover:shadow-md transition-all"
            >
              <Quote size={28} className="text-[#c0392b]/30 mb-4" />
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center font-bold text-sm`}>
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a] text-sm">{item.name}</div>
                    <div className="text-slate-400 text-xs">{item.country}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
                  ))}
                </div>
              </div>
              <div className="mt-3 text-xs text-[#c0392b] font-medium">{item.program}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
