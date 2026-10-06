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

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

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
    <section className="relative bg-[#003822] py-16 md:py-24 text-white overflow-hidden">
      
      {/* --- BACKGROUND GLOW & DOT MATRIX GRID --- */}
      {/* 1. Ambient Glow Accents */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#3fd080]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-88 h-88 bg-[#3fd080]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3fd080]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Subtle Dot Matrix Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3fd080 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header: Matching Home Page Typography Scale */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Prominent Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0e4e34] border border-[#3fd080]/30 text-[#3fd080] text-xs sm:text-[14px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#3fd080] animate-pulse" />
            <span>{badge}</span>
          </div>

          {/* Heading with 50px Font Scale */}
          <h2 className="text-3xl sm:text-5xl md:text-[50px] font-black tracking-tight text-white max-w-4xl leading-[1.18]">
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
          - Mobile: Horizontal scroll snap
          - Desktop: Compact 3-column grid
        */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pb-2 md:pb-0 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
              "Keep your home safe and pest-free with our effective and eco-friendly solutions.";

            return (
              <div
                key={serviceSlug || index}
                className="w-full min-w-full md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink snap-start px-1 md:px-0"
              >
                <div className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full text-neutral-900 border border-neutral-100">
                  
                  {/* Top Image */}
                  <div>
                    <div className="relative w-full h-[210px] sm:h-[230px] overflow-hidden bg-neutral-100">
                      <Image
                        src={cardImg}
                        alt={serviceName}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Card Content with Enlarged Font & Medium Weight Description */}
                    <div className="p-6 sm:p-7">
                      <h3 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 tracking-tight mb-2.5 group-hover:text-[#00482B] transition-colors">
                        {serviceName}
                      </h3>
                      
                      <p className="text-neutral-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed line-clamp-3">
                        {serviceDesc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Learn More Link */}
                  <div className="px-6 sm:px-7 pb-6 pt-0">
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] font-bold text-[#00482B] group-hover:text-[#28a760] transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight
                        size={16}
                        strokeWidth={2.5}
                        className="group-hover:translate-x-1.5 transition-transform"
                      />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        {items.length > 1 && (
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
        )}

      </div>
    </section>
  );
}