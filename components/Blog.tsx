"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface BlogPost {
  id?: number | string;
  title: string;
  slug?: string;
  href?: string;
  image?: string;
  date?: string;
  author?: string;
  summary?: string;
  body?: string;
}

export default function Blog() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const blogData =
    pestControl?.sections?.Blog?.variants?.PestBlog1 || {};

  const badge = blogData.pretitle || blogData.badge || "OUR BLOG";
  const title = blogData.title || "Latest Insights & Tips on Pest Control";
  const desc =
    blogData.desc ||
    blogData.description ||
    "Stay informed with expert tips, guides, and updates to keep your home and workplace pest-free.";

  const posts: BlogPost[] =
    blogData.posts || blogData.blogItems || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount =
        container.clientWidth * (window.innerWidth < 768 ? 0.85 : 0.35);
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#f5faf7] overflow-hidden">
      {/* --- BACKGROUND EFFECTS (TESTIMONIALS STYLE) --- */}
      {/* 1. Top Vibrant Green Glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#3fd080]/25 rounded-full blur-[110px] pointer-events-none" />

      {/* 2. Side Ambient Radial Accents */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-[#00482B]/18 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3fd080]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 3. Dot Matrix Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00482B 1.6px, transparent 1.6px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Prominent Badge Pill */}
          <div className="inline-flex items-center gap-2.5 bg-[#d7f0e3] border border-[#a8dfc4] px-4 py-2 rounded-full mb-5 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00482B] animate-pulse" />
            <span className="text-sm sm:text-[15px] font-black uppercase tracking-[0.18em] text-[#00482B]">
              {badge}
            </span>
          </div>

          {/* Heading with Large Size and Font Black */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#003822] tracking-tight max-w-3xl leading-[1.15]">
            {title.includes("Pest Control") ? (
              <>
                {title.split("Pest Control")[0]}
                <span className="text-[#2fd17b]">Pest Control</span>
                {title.split("Pest Control")[1]}
              </>
            ) : (
              title
            )}
          </h2>

          <p className="text-neutral-700 text-base sm:text-lg font-medium max-w-2xl mt-4 leading-relaxed px-2">
            {desc}
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative md:px-14">
          {/* Desktop Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Slide"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-[#00482B] shadow-lg border border-neutral-200 items-center justify-center hover:bg-[#00482B] hover:text-white transition duration-200 focus:outline-none cursor-pointer"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          {/* Desktop Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next Slide"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-[#00482B] shadow-lg border border-neutral-200 items-center justify-center hover:bg-[#00482B] hover:text-white transition duration-200 focus:outline-none cursor-pointer"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 md:py-4 px-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post, idx) => {
              const postSlug = post.slug || `post-${idx + 1}`;
              const postLink = post.href || `/blog/${postSlug}`;
              const postImg =
                post.image ||
                "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80";

              return (
                <div
                  key={post.id || postSlug || idx}
                  className="w-[86vw] sm:w-[340px] md:w-[calc(33.333%-1.05rem)] flex-shrink-0 snap-center rounded-3xl overflow-hidden shadow-lg border border-white/80 flex flex-col justify-end relative h-[400px] sm:h-[440px] group/card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={postImg}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-3">
                    <h3 className="text-white font-extrabold text-lg sm:text-xl leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <div className="pt-3 border-t border-white/20">
                      <Link
                        href={postLink}
                        className="inline-flex items-center gap-2 text-white/95 hover:text-[#3fd080] text-sm font-bold tracking-wide transition group-hover/card:translate-x-1"
                      >
                        <span>Read More</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Accent Glow Line on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#3fd080] scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left z-20" />
                </div>
              );
            })}
          </div>

          {/* Mobile Bottom Navigation Controls */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous Blog"
              className="w-10 h-10 rounded-full bg-white text-[#00482B] shadow-md border border-neutral-200 flex items-center justify-center active:scale-95 transition"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <span className="text-xs font-semibold text-neutral-500">
              Swipe or tap arrows
            </span>
            <button
              onClick={() => scroll("right")}
              aria-label="Next Blog"
              className="w-10 h-10 rounded-full bg-white text-[#00482B] shadow-md border border-neutral-200 flex items-center justify-center active:scale-95 transition"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}