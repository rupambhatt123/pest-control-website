"use client";

import { useState } from "react";
import { ChevronDown, Phone, Mail, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/data/websiteData.json";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqContent() {
  const common = siteData.common;
  const faqData =
    siteData.categories.PestControl.sections.FAQ.variants.PestFAQ1;
  const faqList: FaqItem[] = faqData.items;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
<section className="relative bg-[#f8fbf9] py-10 md:py-12 px-5 sm:px-8 md:px-12 text-neutral-900 overflow-visible">      {/* Background Dot Matrix Pattern & Ambient Glow */}
      <div className="absolute top-0 right-10 w-[450px] h-[350px] bg-[#3fd080]/10 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00482B 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - FAQ badge enlarged & Title spacing tightened */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <span className="bg-[#d4ece0] text-[#00482B] text-sm sm:text-base font-bold uppercase tracking-wider px-6 py-2 rounded-full mb-3 shadow-xs">
            {faqData.badge || "FAQ"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight max-w-4xl leading-tight text-neutral-900">
            {faqData.title}
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl font-normal">
            {faqData.description}
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
          
          {/* Left Column: FAQ Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-neutral-200/90 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-neutral-50/70 transition cursor-pointer"
                  >
                    {/* Boldness reduced to clean, readable font-semibold */}
                    <span className="font-semibold text-neutral-800 text-base sm:text-lg md:text-[19px] pr-4 leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#00482B] text-white rotate-180"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <ChevronDown size={20} strokeWidth={2} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base font-normal text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Support Box */}
          <div className="lg:col-span-4 sticky top-24 z-20 self-start">
            <div className="bg-[#003822] text-white rounded-3xl p-6 sm:p-7 flex flex-col shadow-xl border border-[#00482B] relative">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#3fd080]">
                <HelpCircle size={24} />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">
                {faqData.supportCard?.title || "Still have any question?"}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mb-5 font-normal">
                Cannot find the answer you are looking for? Our friendly pest management specialists are ready to help.
              </p>

              {/* Compact CTA Buttons */}
              <div className="flex flex-col gap-2.5">
                <a
                  href={`tel:${common.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl transition text-[13px] font-bold border border-white/5"
                >
                  <Phone size={15} className="text-[#3fd080] flex-shrink-0" />
                  <span className="truncate">{common.phone}</span>
                </a>
                <a
                  href={`mailto:${common.email}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl transition text-[13px] font-bold border border-white/5"
                >
                  <Mail size={15} className="text-[#3fd080] flex-shrink-0" />
                  <span className="truncate">{common.email}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}