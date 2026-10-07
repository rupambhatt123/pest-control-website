"use client";

import Image from "next/image";
import { 
  ShieldCheck, 
  Users, 
  Leaf, 
  CircleDollarSign, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import siteData from "@/data/websiteData.json";

// Dynamic icon mapper JSON features ke liye
const renderFeatureIcon = (index: number, iconName?: string) => {
  const iconProps = { className: "w-6 h-6 text-[#00482B]", strokeWidth: 2.2 };
  
  if (iconName) {
    const lower = iconName.toLowerCase();
    if (lower.includes("shield") || lower.includes("safe")) return <ShieldCheck {...iconProps} />;
    if (lower.includes("user") || lower.includes("team") || lower.includes("pro")) return <Users {...iconProps} />;
    if (lower.includes("leaf") || lower.includes("eco")) return <Leaf {...iconProps} />;
    if (lower.includes("dollar") || lower.includes("price") || lower.includes("cost")) return <CircleDollarSign {...iconProps} />;
    if (lower.includes("clock") || lower.includes("time") || lower.includes("24")) return <Clock {...iconProps} />;
    if (lower.includes("award") || lower.includes("satisfaction") || lower.includes("guarantee")) return <Award {...iconProps} />;
  }

  // Fallback by index matching reference layout
  const defaultIcons = [
    <ShieldCheck key="0" {...iconProps} />,
    <Users key="1" {...iconProps} />,
    <Leaf key="2" {...iconProps} />,
    <CircleDollarSign key="3" {...iconProps} />,
    <Clock key="4" {...iconProps} />,
    <Award key="5" {...iconProps} />,
  ];

  return defaultIcons[index % defaultIcons.length] || <CheckCircle2 {...iconProps} />;
};

export default function WhyChooseUs() {
  // 1. Direct JSON extraction
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const whyData =
    pestControl?.sections?.WhyChooseUs?.variants?.PestWhyChooseUs1 ||
    pestControl?.sections?.WhyUs?.variants?.PestWhyUs1 ||
    pestControl?.sections?.Features?.variants?.PestFeatures1 ||
    {};

  // Dynamic headers & text from JSON
  const badge = whyData.pretitle || whyData.badge || "WHY CHOOSE US";
  const title = whyData.title || "Why Choose";
  const titleHighlight = whyData.titleHighlight || " ";
  const description =
    whyData.desc ||
    whyData.description ||
    whyData.subtitle ||
    "We deliver safe, effective and eco-friendly pest control solutions for homes, offices and commercial spaces. Our focus is on quality service, customer satisfaction and a healthier environment for you.";

  // Dynamic image from JSON
  const image =
    whyData.image ||
    whyData.imageUrl ||
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";

  // Fallback 4 items agar JSON empty ho
  const fallbackFeatures = [
    {
      title: "Safe & Effective Solutions",
      desc: "We use safe and tested methods to ensure long-lasting protection.",
    },
    {
      title: "Experienced Professionals",
      desc: "Our trained team delivers reliable and high-quality pest control services.",
    },
    {
      title: "Eco-Friendly Methods",
      desc: "We care for your health and the environment with green solutions.",
    },
    {
      title: "Affordable & Transparent Pricing",
      desc: "High-quality services at competitive prices with no hidden costs.",
    },
  ];

  // Dynamic items array from JSON
  const rawItems: any[] =
    whyData.items || whyData.features || whyData.reasons || [];

  const features =
    rawItems.length > 0
      ? rawItems.slice(0, 4).map((item, idx) => ({
          title: item.title || item.name || fallbackFeatures[idx % fallbackFeatures.length].title,
          desc:
            item.desc ||
            item.description ||
            item.subDesc ||
            fallbackFeatures[idx % fallbackFeatures.length].desc,
          iconName: item.icon || item.iconName,
        }))
      : fallbackFeatures;

  return (
    <section className="relative bg-[#f8fbf9] pt-2 sm:pt-4 pb-14 md:pb-16 text-neutral-900 overflow-hidden">
      {/* --- BACKGROUND EFFECTS (Glow & Dot Matrix) --- */}
      {/* 1. Ambient Glow Accents */}
      <div className="absolute -top-24 right-1/4 w-[500px] h-[350px] bg-[#3fd080]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-80 h-80 bg-[#00482B]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* 2. Dot Matrix Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00482B 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Container aligned to max-w-[1240px] */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Split Grid: Left Content (7 cols) + Right Image (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & 2x2 Feature Grid */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Dynamic Pill Badge */}
            <div className="inline-block bg-[#d4ece0] text-[#00482B] text-xs sm:text-[13px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-xs">
              {badge}
            </div>

            {/* Left-Aligned Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight leading-tight text-neutral-900 mb-4">
              {title} <span className="text-[#00482B]">{titleHighlight}</span>
            </h2>

            {/* Dynamic Description Paragraph */}
            <p className="text-neutral-600 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-xl mb-8 font-normal">
              {description}
            </p>

            {/* Subtle Divider Line */}
            <div className="w-full h-[1px] bg-neutral-200/80 mb-8" />

            {/* 2x2 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7 w-full">
              {features.map((feat: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  {/* Mint Icon Container */}
                  <div className="w-13 h-13 rounded-2xl bg-[#e4f4ec] flex items-center justify-center flex-shrink-0">
                    {renderFeatureIcon(idx, feat.iconName)}
                  </div>
                  {/* Text Details */}
                  <div>
                    <h3 className="text-[16px] sm:text-[17px] font-bold text-neutral-900 mb-1 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-neutral-600 text-[13px] sm:text-[13.5px] leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Dynamic Image with Reference Borders */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full h-[360px] sm:h-[430px] md:h-[480px] rounded-3xl overflow-hidden shadow-xs border border-neutral-100">
              <Image
                src={image}
                alt={title || "Pest Control"}
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}