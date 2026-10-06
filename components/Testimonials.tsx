"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import siteData from "@/data/websiteData.json";

export default function Testimonials() {
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const testimonialData =
    pestControl?.sections?.Testimonials?.variants?.PestTestimonials1 ||
    pestControl?.sections?.Reviews?.variants?.PestReviews1 ||
    {};

  const badge = testimonialData.badge || "TESTIMONIALS";

  // Exact reference items with photos
  const items = [
    {
      name: "Rohit Sharma",
      role: "Home Owner",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      content:
        "The pest control service was excellent! The team was professional, on-time, and very thorough. Our home is now completely pest-free, and we couldn’t be happier with the results. Highly recommended!",
    },
    {
      name: "Priya Mehta",
      role: "Business Owner",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      content:
        "We have been using their pest control services for our office, and the experience has been great. The team is knowledgeable, uses safe methods, and ensures long-lasting protection. Our workspace is now much cleaner and safer.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mobile swipe par active dot detect karega
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  // Dot click karne par specific card par slide karega
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
    <section className="relative bg-[#f8fbf9] py-14 md:py-20 text-neutral-900 overflow-hidden">
      
      {/* Background Ambient Glow & Dot Matrix */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#3fd080]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#00482B]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00482B 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-9 md:mb-12">
          {/* TESTIMONIALS BADGE */}
          <div className="inline-block bg-[#d4ece0] text-[#00482B] text-sm sm:text-[15px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full mb-4 shadow-xs">
            {badge}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-neutral-900 leading-tight">
            What Our <span className="text-[#00482B]">Clients Say</span>
          </h2>
        </div>

        {/* 
          Cards Wrapper:
          - Mobile (Phone): Horizontal scroll snap, 1 card focus (100% width)
          - Desktop: 2-card grid (md:grid-cols-2)
        */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-2 gap-6 pb-2 md:pb-0 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="w-full min-w-full md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink snap-center"
            >
              <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between h-full min-h-[310px]">
                {/* Review Text */}
                <p className="text-neutral-700 text-[16px] sm:text-[18px] leading-[1.7] font-medium mb-8">
                  {item.content}
                </p>

                {/* Bottom Author Row */}
                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#00482B] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-[17px] sm:text-[19px] font-bold text-neutral-900 leading-tight mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[13.5px] sm:text-[15px] font-semibold text-[#00482B] mb-1.5">
                        {item.role}
                      </p>
                      <div className="flex items-center gap-1 text-[#f5a623]">
                        {Array.from({ length: item.rating }).map((_, starIdx) => (
                          <Star key={starIdx} size={16} fill="currentColor" stroke="none" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Double Quote Symbol */}
                  <span className="text-[#a8d6bf] font-serif text-5xl sm:text-6xl leading-none select-none font-bold">
                    ”
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View Sliding Dots (Desktop par hide rahega) */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToCard(dotIdx)}
              aria-label={`Slide to card ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? "w-6 bg-[#00482B]"
                  : "w-2 bg-[#00482B]/25 hover:bg-[#00482B]/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}