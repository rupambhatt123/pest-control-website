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
    <section className="bg-white py-16 px-6 md:px-12 text-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="bg-[#e4f4ed] text-[#00482B] text-xs font-bold uppercase tracking-wider px-5 py-1.5 rounded-full mb-4">
            {faqData.badge || "FAQ"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl leading-snug">
            {faqData.title}
          </h2>
          <p className="mt-3.5 text-neutral-500 text-sm md:text-base max-w-xl">
            {faqData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors duration-200 bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-neutral-50 transition cursor-pointer"
                  >
                    <span className="font-bold text-neutral-900 text-sm sm:text-base pr-4">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#00482B] text-white rotate-180"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <ChevronDown size={18} />
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
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Side Support Box */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#00482B] text-white rounded-3xl p-6 sm:p-8 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-[#3fd080]">
                <HelpCircle size={26} />
              </div>
              <h3 className="text-xl font-extrabold mb-2">
                {faqData.supportCard?.title || "Still have any question?"}
              </h3>
              <p className="text-xs text-neutral-200 leading-relaxed mb-6">
                Cannot find the answer you are looking for? Our friendly pest management specialists are ready to help.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${common.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3.5 rounded-xl transition text-xs font-bold"
                >
                  <Phone size={16} className="text-[#3fd080]" />
                  <span>{common.phone}</span>
                </a>
                <a
                  href={`mailto:${common.email}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3.5 rounded-xl transition text-xs font-bold"
                >
                  <Mail size={16} className="text-[#3fd080]" />
                  <span>{common.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}