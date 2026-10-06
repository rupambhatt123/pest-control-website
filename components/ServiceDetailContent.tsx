"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, Phone } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface ServiceItem {
  slug: string;
  name: string;
  image: string;
  heading: string;
  desc1: string;
  desc2: string;
  keyBenefits: string[];
}

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const common = siteData.common;
  const servicesList: ServiceItem[] =
    siteData.categories.PestControl.sections.Services.variants.PestServices1.items;

  // URL slug ke hisaab se current service find karo
  const currentService =
    servicesList.find((s) => s.slug === slug) || servicesList[0];

  return (
    <div className="bg-white py-12 md:py-16 px-4 md:px-12 text-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Service Details */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Main Service Image */}
          <div className="w-full h-[340px] sm:h-[450px] rounded-3xl overflow-hidden bg-neutral-100 shadow-sm">
            <img
              src={currentService.image}
              alt={currentService.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
              {currentService.heading || currentService.name}
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4">
              {currentService.desc1}
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {currentService.desc2}
            </p>
          </div>

          {/* Key Benefits */}
          {currentService.keyBenefits && currentService.keyBenefits.length > 0 && (
            <div className="bg-[#f7faf8] border border-[#e2ece5] rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-5">
                Key Benefits of our {currentService.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[#00482B] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-xs sm:text-sm text-neutral-700 leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Sidebar Navigation */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#00482B] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-extrabold mb-5 tracking-wide">
              Our Pest Control Services
            </h3>
            <div className="flex flex-col gap-2.5">
              {servicesList.map((service) => {
                const isActive = service.slug === currentService.slug;
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition ${
                      isActive
                        ? "bg-[#2fd17b] text-[#00482B]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <span>{service.name}</span>
                    <ChevronRight size={16} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Help Box */}
          <div className="bg-[#f0f8f4] border border-[#d6ecdf] rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#00482B] text-white flex items-center justify-center mb-3">
              <Phone size={20} />
            </div>
            <h4 className="font-extrabold text-neutral-900 text-sm">
              Need Immediate Pest Help?
            </h4>
            <p className="text-xs text-neutral-600 mt-1 mb-4">
              Talk directly with our licensed exterminators.
            </p>
            <a
              href={`tel:${common.phone.replace(/\s+/g, "")}`}
              className="bg-[#00482B] hover:bg-[#063321] text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition"
            >
              Call {common.phone}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}