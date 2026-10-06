"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import siteData from "@/data/websiteData.json";

export default function Testimonials() {
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const testimonialData =
    pestControl?.sections?.Testimonials?.variants?.PestTestimonials1 ||
    pestControl?.sections?.Reviews?.variants?.PestReviews1 ||
    {};

  const badge = testimonialData.badge || "TESTIMONIALS";
  const title = testimonialData.title || "What Our Clients Say";

  const items: any[] = testimonialData.items || [
    {
      name: "Rohit Sharma",
      role: "Home Owner",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content:
        "The pest control service was excellent! The team was professional, on-time, and very thorough. Our home is now completely pest-free, and we couldn't be happier with the results. Highly recommended!",
    },
    {
      name: "Priya Mehta",
      role: "Business Owner",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      content:
        "We have been using their pest control services for our office, and the experience has been great. The team is knowledgeable, uses safe methods, and ensures long-lasting protection. Our workspace is now much cleaner and safer.",
    },
    {
      name: "Vikram Malhotra",
      role: "Restaurant Owner",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content:
        "Top notch service! In the restaurant industry hygiene is everything. Their quick response and eco-friendly treatment gave us complete peace of mind. Truly dependable team.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll logic (every 4.5s)
  useEffect(() => {
    if (isPaused || items.length <= 2) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, items.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= items.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 360;
    container.scrollTo({
      left: currentIndex * (cardWidth + 24),
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <section className="relative py-20 md:py-28 bg-[#f5faf7] overflow-hidden">
      {/* --- BACKGROUND EFFECTS (MORE VISIBLE & RICH) --- */}
      {/* 1. Top Center Vibrant Green Ambient Glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#3fd080]/25 rounded-full blur-[110px] pointer-events-none" />

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          
          {/* TESTIMONIALS BADGE: Exactly like About Us */}
          <div className="inline-flex items-center gap-2.5 bg-[#d7f0e3] border border-[#a8dfc4] px-4 py-2 rounded-full mb-5 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00482B] animate-pulse" />
            <span className="text-sm sm:text-[15px] font-black uppercase tracking-[0.18em] text-[#00482B]">
              {badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#003822] tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scrollable Cards Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-2 md:overflow-visible"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className="w-[85vw] sm:w-[420px] md:w-auto min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-center flex-shrink-0 group relative rounded-3xl p-8 sm:p-9 bg-gradient-to-b from-white via-white to-[#f7fbf9] border border-white/90 shadow-[0_12px_35px_rgba(0,48,27,0.06)] hover:shadow-[0_22px_45px_rgba(0,56,34,0.14)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Review Text */}
                <p className="text-neutral-700 text-base sm:text-[17px] font-medium leading-relaxed mb-8">
                  "{item.content || item.review}"
                </p>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-neutral-100 mb-6" />

                {/* Author Info & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-[#3fd080] shadow-sm flex-shrink-0">
                      <Image
                        src={item.image || "/avatar.png"}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-neutral-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
                        {item.role || "Client"}
                      </p>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 mt-1.5 text-amber-400">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Quote Mark */}
                  <div className="w-12 h-12 rounded-2xl bg-[#e3f4ec] flex items-center justify-center text-[#00482B] group-hover:scale-110 transition-transform">
                    <Quote size={24} className="rotate-180 fill-current opacity-85" />
                  </div>
                </div>

                {/* Bottom subtle accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#3fd080] rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>

          {/* Controls: Arrows & Indicators */}
          {items.length > 2 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-[#003822] hover:text-white text-neutral-700 shadow-sm flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2 px-2">
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === dotIdx
                        ? "w-7 bg-[#003822]"
                        : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next review"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-[#003822] hover:text-white text-neutral-700 shadow-sm flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}