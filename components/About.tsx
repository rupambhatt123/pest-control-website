"use client";

import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import siteData from "@/data/websiteData.json";

export default function About() {
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const aboutData =
    pestControl?.sections?.About?.variants?.PestAbout1 || {};

  const badge = aboutData.badge || "ABOUT US";
  const title = aboutData.title || "Your Trusted Partner in";
  const titleHighlight = aboutData.titleHighlight || "Pest Control";
  const subtitle =
    aboutData.subtitle ||
    "We are a professional pest control company committed to creating healthier and safer spaces for your home and business.";
  const description =
    aboutData.description ||
    "With years of experience in the industry, we provide reliable and effective pest control solutions for residential, commercial, and industrial properties. Our team uses safe, eco-friendly methods and advanced equipment to ensure long-lasting protection from unwanted pests.";
  const highlights: string[] = aboutData.highlights || [
    "Experienced and trained pest control professionals.",
    "Safe, effective and eco-friendly pest control solutions.",
    "Customized services for homes, offices, and industries.",
  ];
  const image =
    aboutData.image ||
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="relative py-20 md:py-28 bg-[#f5faf7] overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS (EXACT BLOG & TESTIMONIALS STYLE) --- */}
      {/* 1. Top Vibrant Green Glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#3fd080]/25 rounded-full blur-[110px] pointer-events-none" />

      {/* 2. Side Ambient Radial Accents */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-[#00482B]/18 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3fd080]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 3. Clearly Visible Clean Dot Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00482B 1.6px, transparent 1.6px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Side: Modern Layered Image */}
        <div className="lg:col-span-6 w-full relative">
          
          {/* Background Decorative Accent Ring / Card */}
          <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-[#00482B]/10 to-[#3fd080]/20 rounded-[2.5rem] -rotate-1 transform -z-10" />

          {/* Actual Main Image */}
          <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl border border-white/60">
            <Image
              src={image}
              alt="Pest Control Specialist"
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Eco-Friendly Trust Badge */}
          <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 bg-white/95 backdrop-blur-md border border-[#d6ecdf] shadow-lg rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00482B] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <ShieldCheck size={22} className="text-[#3fd080]" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Certified</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#00482B]">100% Eco-Safe Care</p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-6 flex flex-col items-start">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#d7f0e3] border border-[#a8dfc4] px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00482B] animate-pulse" />
            <span className="text-sm sm:text-[15px] font-black uppercase tracking-[0.18em] text-[#00482B]">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-[1.15] mb-6">
            {title} <br className="hidden sm:inline" />
            <span className="text-[#00482B]">{titleHighlight}</span>
          </h2>

          {/* Subtitle / Lead Paragraph */}
          <p className="text-neutral-800 font-bold text-base sm:text-lg leading-relaxed mb-4">
            {subtitle}
          </p>

          {/* Secondary Description */}
          <p className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed mb-8">
            {description}
          </p>

          {/* Solid Green Checkmark Highlights */}
          <div className="flex flex-col gap-4 w-full">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-[#00482B] group-hover:bg-[#063321] flex items-center justify-center flex-shrink-0 text-white shadow-sm transition">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-sm sm:text-base font-semibold text-neutral-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}