"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface ServiceItem {
  slug: string;
  name?: string;
  title?: string;
  image?: string;
  heading?: string;
  desc1?: string;
  desc2?: string;
  description?: string;
  keyBenefits?: string[];
}

export default function Services() {
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const servicesData =
    pestControl?.sections?.Services?.variants?.PestServices1 ||
    pestControl?.sections?.ServicesGrid?.variants?.PestServicesGrid1 ||
    {};

  const badge = servicesData.badge || "OUR SERVICES";
  const title =
    servicesData.title || "Professional Pest Control Services for a Safer Space";
  const items: ServiceItem[] =
    servicesData.items || servicesData.services || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll detect karke active dot update karega
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  // Dot click karne par specific card par smooth scroll karega
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative bg-[#003822] py-20 md:py-28 text-white overflow-hidden">
      {/* Subtle Background Glow Overlays for depth */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#3fd080]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#3fd080]/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Prominent Badge with pulsing accent dot */}
          <div className="inline-flex items-center gap-2.5 bg-[#0f4d34] border border-[#3fd080]/30 px-4 py-2 rounded-full mb-5 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3fd080] animate-pulse" />
            <span className="text-sm sm:text-[15px] font-black uppercase tracking-[0.18em] text-[#3fd080]">
              {badge}
            </span>
          </div>

          {/* Heading - Bada, bold & tight leading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-3xl leading-[1.15]">
            {title.includes("Pest Control") ? (
              <>
                {title.split("Pest Control")[0]}
                <span className="text-[#3fd080]">Pest Control</span>
                {title.split("Pest Control")[1]}
              </>
            ) : (
              title
            )}
          </h2>
        </div>

        {/* 
          Cards Wrapper:
          - Phone: w-full scroll snap track, 1 card focus
          - Desktop: grid-cols-2 lg:grid-cols-3
        */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none"
        >
          {items.map((item, index) => {
            const serviceName = item.name || item.title || `Service ${index + 1}`;
            const serviceSlug =
              item.slug ||
              serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const cardImg =
              item.image ||
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80";
            const serviceDesc =
              item.desc1 ||
              item.description ||
              "Effective and eco-friendly solutions to protect your property.";

            return (
              <div
                key={serviceSlug || index}
                className="w-full min-w-full md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink snap-start px-2 md:px-0"
              >
                <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white via-white to-[#f7fbf8] border border-white/60 shadow-lg hover:shadow-[0_22px_45px_rgba(0,0,0,0.38)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-full">
                  
                  {/* Top Image Box */}
                  <div>
                    <div className="relative w-full h-[220px] sm:h-[240px] bg-neutral-100 overflow-hidden flex-shrink-0">
                      <Image
                        src={cardImg}
                        alt={serviceName}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Subtle hover gradient wash */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Content Area */}
                    <div className="p-6 sm:p-7">
                      <h3 className="text-xl sm:text-2xl font-black text-[#003822] tracking-tight mb-2.5 break-words group-hover:text-[#00482B] transition-colors">
                        {serviceName}
                      </h3>
                      <p className="text-sm sm:text-base font-medium text-neutral-700 leading-relaxed line-clamp-3">
                        {serviceDesc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Read More Link */}
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2">
                    <div className="pt-3 border-t border-neutral-100">
                      <Link
                        href={`/services/${serviceSlug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#003822] group-hover:text-[#2fd17b] transition group/link"
                      >
                        <span>Read More</span>
                        <ArrowRight
                          size={15}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Accent Glow Line on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#3fd080] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToCard(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? "w-6 bg-[#3fd080]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}