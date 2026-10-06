"use client";

import { motion } from "framer-motion";
import siteData from "@/data/websiteData.json";

export default function Hero() {
  const banner =
    (siteData as any).categories?.PestControl?.sections?.Banner?.variants?.PestBanner1 || {};

  return (
    <section className="relative w-full min-h-[480px] md:h-[540px] flex items-center overflow-hidden bg-[#073322]">
      {/* Background Image Container with Reference Matching Gradient */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right md:bg-center"
        style={{
          backgroundImage: `url("${banner.backgroundImage || '/pestcontrol.jpeg'}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d24] via-[#00482B]/95 md:via-[#00482B]/85 to-transparent w-full md:w-[68%]" />
      </div>

      {/* Compact max-w-[1240px] container perfectly aligned with TopBar & Navbar */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full py-12 md:py-16">
        <div className="max-w-xl text-white">
          
          {/* Badge: Compact, neat & clean */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-[#0e5035] border border-[#2fa86d]/40 text-[#3fd080] text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full mb-5 shadow-xs"
          >
            {banner.badge || "THE PEST CONTROL EXPERTS"}
          </motion.div>

          {/* Main Title: Exact Reference Proportion (Not oversized) */}
          <motion.h1
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[52px] lg:text-[56px] font-black tracking-tight leading-[1.08] text-white"
          >
            {banner.titleLine1 || "Safe & Effective"} <br />
            <span className="text-[#3fd080]">{banner.titleHighlight || "Pest Control"}</span> <br />
            {banner.titleLine2 || "Services"}
          </motion.h1>

          {/* Description: Balanced font size & tight width */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/90 text-sm sm:text-[15px] font-medium leading-relaxed max-w-md"
          >
            {banner.description || "Keep your home and workplace free from unwanted pests with our reliable and professional pest control solutions."}
          </motion.p>

        </div>
      </div>
    </section>
  );
}