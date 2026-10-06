"use client";

import { useState } from "react";
import Image from "next/image";
import siteData from "@/data/websiteData.json";

interface GalleryFilter {
  label: string;
  value: string;
  field?: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const galleryData =
    pestControl?.sections?.Gallery?.variants?.PestGallery1 || {};

  const badge = galleryData.pretitle || galleryData.badge || "GALLERY";
  const title = galleryData.title || "Our Work in Action";
  const desc =
    galleryData.desc ||
    galleryData.description ||
    "Explore photos of our professional team protecting homes, offices, and commercial sites.";

  const filters: GalleryFilter[] =
    galleryData.categories || galleryData.filters || [
      { label: "All Work", value: "all" },
      { label: "Residential", value: "residential" },
      { label: "Commercial", value: "commercial" },
      { label: "Termite Defense", value: "termite" },
      { label: "Outdoor & Yard", value: "outdoor" },
    ];

  const rawItems: any[] =
    galleryData.items || galleryData.galleryItems || galleryData.images || [];

  const items = rawItems.map((item, idx) => ({
    id: item.id || idx,
    image:
      item.image ||
      item.src ||
      item.img ||
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    alt: item.alt || item.title || "Gallery Image",
    title: item.title || item.heading || "Pest Control Service",
    category: item.category || item.tag || "Residential",
    description: item.description || item.body || item.desc || "",
  }));

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter(
          (item) =>
            item.category?.toLowerCase().trim() ===
            activeFilter.toLowerCase().trim()
        );

  return (
    <section className="bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <span className="bg-[#e4f4ed] text-[#00482B] text-xs sm:text-sm font-extrabold uppercase tracking-widest px-6 py-2 rounded-full mb-3 shadow-sm inline-block">
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00482B] tracking-tight max-w-3xl leading-tight">
            {title}
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm md:text-base max-w-2xl mt-3 leading-relaxed px-2">
            {desc}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 md:pb-0 md:justify-center scrollbar-none mb-8 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0">
          {filters.map((tab) => {
            const isSelected = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                  isSelected
                    ? "bg-[#00482B] text-white shadow-md"
                    : "bg-[#f1f5f3] text-neutral-700 hover:bg-[#e2ebe6]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-7 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="w-full min-w-full md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink snap-start"
            >
              <div className="rounded-3xl overflow-hidden shadow-md border border-neutral-100 relative h-[400px] sm:h-[430px] group transition-all duration-300 hover:shadow-xl flex flex-col justify-end">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-2">
                  <span className="text-[#3fd080] text-[11px] sm:text-xs font-black uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-white font-extrabold text-lg sm:text-xl leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}