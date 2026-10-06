"use client";

import { motion } from "framer-motion";
import siteData from "@/data/websiteData.json";

export default function Hero() {
  const banner =
    (siteData as any).categories?.PestControl?.sections?.Banner?.variants?.PestBanner1 || {};

  return (
    <section className="relative w-full min-h-[580px] md:h-[680px] flex items-center overflow-hidden bg-gradient-to-r from-[#073322] via-[#0b5438]/90 to-transparent">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right md:bg-center"
        style={{
          backgroundImage: `url("${banner.backgroundImage || '/pestcontrol.jpeg'}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#073121] via-[#09472e]/95 md:via-[#09472e]/85 to-transparent w-full md:w-3/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <div className="max-w-3xl text-white">
          
          {/* Badge: Bold aur crisp */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-[#0e6140] border border-[#3fd080]/30 text-emerald-100 text-xs sm:text-sm font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            {banner.badge || "THE PEST CONTROL EXPERTS"}
          </motion.div>

          {/* Main Title: Bada, heavy font-black aur tight line-height */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight leading-[1.08] drop-shadow-md"
          >
            {banner.titleLine1} <br />
            <span className="text-[#3fd080]">{banner.titleHighlight}</span> <br />
            {banner.titleLine2}
          </motion.h1>

          {/* Description: Clear aur bolder font */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-neutral-200 text-base sm:text-xl font-medium leading-relaxed max-w-xl drop-shadow-sm"
          >
            {banner.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}