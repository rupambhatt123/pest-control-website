"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import siteData from "@/data/websiteData.json";

export default function TopBar() {
  const common = (siteData as any).common || {};
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const topbarData = pestControl?.sections?.Topbar?.variants?.PestTopbar1 || {};

  const phone = common.phone || topbarData.phone || "+1 00000 00000";
  const email = common.email || topbarData.email || "info@xyz.com";
  const address =
    common.address ||
    topbarData.address ||
    topbarData.location ||
    "742 Evergreen Terrace, Springfield, OR 97477, USA";

  const quoteLink =
    topbarData.buttons?.[0]?.href || topbarData.quoteButtonLink || "/quote";
  const quoteText =
    topbarData.buttons?.[0]?.label || topbarData.quoteButtonText || "GET A QUOTE";

  return (
    <div className="bg-[#00482B] text-white py-2.5 sm:py-3 px-4 sm:px-6 md:px-12 border-b border-[#043d25]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Section: 
            - Phone (Default): Sirf Email dikhega
            - Desktop (lg:): Address | Phone | Email teeno dikhenge
        */}
        <div className="flex items-center gap-4 lg:gap-8 text-neutral-100 text-[12px] sm:text-[13px] font-normal tracking-wide">
          
          {/* Address - Only on Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <MapPin size={15} className="text-[#3fd080] flex-shrink-0" />
            <span>{address}</span>
          </div>

          <span className="hidden lg:inline text-white/30 font-light">|</span>

          {/* Phone - Only on Desktop */}
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="hidden lg:flex items-center gap-2 hover:text-[#3fd080] transition"
          >
            <Phone size={14} className="text-[#3fd080] flex-shrink-0" />
            <span>{phone}</span>
          </a>

          <span className="hidden lg:inline text-white/30 font-light">|</span>

          {/* Email - Phone par bhi dikhega aur Desktop par bhi */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-[#3fd080] transition text-[12px] sm:text-[13px]"
          >
            <Mail size={14} className="text-[#3fd080] flex-shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">{email}</span>
          </a>
        </div>

        {/* Right Section: GET A QUOTE Button
            - Mobile & Desktop dono par right side rahega
        */}
        <div>
          <Link
            href={quoteLink}
            className="bg-white hover:bg-neutral-100 text-[#00482B] font-extrabold text-[11px] sm:text-[12px] lg:text-[13px] uppercase tracking-wider px-3.5 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-md lg:rounded-lg transition shadow-sm inline-block"
          >
            {quoteText}
          </Link>
        </div>

      </div>
    </div>
  );
}