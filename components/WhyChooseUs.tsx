"use client";

import { ShieldCheck, Leaf, Clock, Award } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

export default function WhyChooseUs() {
  const whyData =
    siteData.categories.PestControl.sections.WhyChooseUs?.variants
      ?.PestWhyChooseUs1 || {
      badge: "WHY CHOOSE US",
      title: "Why We Are Your Best Choice",
      description:
        "We deliver safe, reliable, and guaranteed pest management solutions for homes and businesses.",
      features: [],
    };

  const featureIcons = [
    <ShieldCheck key="shield" size={24} className="text-[#00482B]" />,
    <Leaf key="leaf" size={24} className="text-[#00482B]" />,
    <Clock key="clock" size={24} className="text-[#00482B]" />,
    <Award key="award" size={24} className="text-[#00482B]" />,
  ];

  return (
    <section className="bg-[#f7faf8] py-20 px-6 md:px-12 text-neutral-900 border-y border-[#e2ece5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="bg-[#e4f4ed] text-[#00482B] text-xs font-extrabold uppercase tracking-wider px-5 py-1.5 rounded-full mb-4">
            {whyData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl leading-snug">
            {whyData.title}
          </h2>
          <p className="mt-3.5 text-neutral-600 text-sm md:text-base max-w-2xl leading-relaxed">
            {whyData.description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyData.features?.map((item: FeatureItem, index: number) => (
            <div
              key={item.id || index}
              className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e4f4ed] flex items-center justify-center flex-shrink-0">
                {featureIcons[index % featureIcons.length]}
              </div>

              <div>
                <h4 className="font-extrabold text-neutral-900 text-base mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}