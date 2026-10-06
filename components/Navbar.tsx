"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import siteData from "@/data/websiteData.json";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const common = (siteData as any).common || {};
  const pestControl =
    (siteData as any).categories?.PestControl || (siteData as any).PestControl || {};
  const headerData = pestControl?.sections?.Header?.variants?.PestHeader1 || {};

  // 1. Dynamic Services extract from JSON
  const servicesSection =
    pestControl?.sections?.Services?.variants?.PestServices1 ||
    pestControl?.sections?.ServicesGrid?.variants?.PestServicesGrid1 ||
    {};

  const dynamicServicesList: Array<{ label: string; href: string }> = (
    servicesSection?.items ||
    servicesSection?.services ||
    []
  ).map((svc: any, idx: number) => {
    const name = svc.name || svc.title || `Service ${idx + 1}`;
    const slug =
      svc.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return {
      label: name,
      href: `/services/${slug}`,
    };
  });

  const defaultServices = [
    { label: "Ant Control", href: "/services/ant-control" },
    { label: "Bed Bug Control", href: "/services/bed-bug-control" },
    { label: "Cockroach Control", href: "/services/cockroach-control" },
    { label: "Mosquito Control", href: "/services/mosquito-control" },
    { label: "Rodent Control", href: "/services/rodent-control" },
    { label: "Termite Control", href: "/services/termite-control" },
  ];

  const resolvedServices =
    dynamicServicesList.length > 0 ? dynamicServicesList : defaultServices;

  // 2. Build Dynamic Navigation Menu
  const rawMenu: any[] = headerData?.menu || headerData?.navLinks || [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  const menuList = rawMenu
    .filter((item) => {
      const lbl = (item.label || item.title || "").toUpperCase();
      return lbl !== "FAQ";
    })
    .map((item) => {
      const label = item.label || item.title || "";
      const isServices =
        label.toUpperCase() === "SERVICES" ||
        item.hasDropdown ||
        (item.children && item.children.length > 0);

      return {
        label,
        href: item.href || item.path || (isServices ? "/services" : "#"),
        children: isServices ? resolvedServices : [],
      };
    });

  // Reusable Social & Contact Icons Component
  const renderSocialIcons = (isMobile = false) => (
    <div className={`flex items-center ${isMobile ? "gap-2" : "gap-2 sm:gap-2.5"}`}>
      <a
        href={common?.socialLinks?.facebook || "https://facebook.com"}
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook"
        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#00482B] text-white flex items-center justify-center hover:bg-[#063321] transition shadow-xs"
      >
        <svg width="12" height="12" className="sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>

      <a
        href={common?.socialLinks?.instagram || "https://instagram.com"}
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#00482B] text-white flex items-center justify-center hover:bg-[#063321] transition shadow-xs"
      >
        <svg
          width="12"
          height="12"
          className="sm:w-3.5 sm:h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>

      <a
        href={
          common?.socialLinks?.whatsapp ||
          (common?.phone
            ? `https://wa.me/${String(common.phone).replace(/[^0-9]/g, "")}`
            : "https://whatsapp.com")
        }
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#00482B] text-white flex items-center justify-center hover:bg-[#063321] transition shadow-xs"
      >
        <svg
          width="12"
          height="12"
          className="sm:w-3.5 sm:h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        </svg>
      </a>
    </div>
  );

  return (
    <header className="bg-white sticky top-0 z-50 shadow-xs border-b border-neutral-100">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-6 h-[70px] sm:h-[74px] flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src={headerData?.logoImage || headerData?.logo || "/logo.jpeg"}
            alt={common?.siteName || "PestControl"}
            width={180}
            height={45}
            priority
            className="h-8 sm:h-10 md:h-11 w-auto object-contain"
          />
        </Link>

        {/* Center Navigation Links - Desktop View */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-bold tracking-tight text-neutral-800">
          {menuList.map((item) => {
            if (item.children && item.children.length > 0) {
              const isChildActive = item.children.some(
                (child: any) => pathname === child.href
              );
              const isActive = pathname === item.href || isChildActive;

              return (
                <div
                  key={item.label}
                  className="relative py-6 group"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    className={`flex items-center gap-1.5 py-1 select-none cursor-default transition ${
                      isActive || servicesDropdownOpen
                        ? "text-[#00482B] font-extrabold after:absolute after:bottom-3 after:left-0 after:w-full after:h-[2.5px] after:bg-[#00482B]"
                        : "hover:text-[#00482B]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2.6}
                      className={`transition-transform duration-200 ${
                        servicesDropdownOpen ? "rotate-180 text-[#00482B]" : "text-neutral-700"
                      }`}
                    />
                  </div>

                  {servicesDropdownOpen && (
                    <div className="absolute top-[68px] left-0 w-60 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50">
                      <Link
                        href={item.href}
                        className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00482B] bg-[#f0f8f4] hover:bg-[#e2f1ea] border-b border-neutral-100 transition"
                      >
                        ALL SERVICES
                      </Link>

                      <div className="max-h-[300px] overflow-y-auto">
                        {item.children.map((child: any) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-[#eaf5ef] hover:text-[#00482B] transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition py-1 relative ${
                  isActive
                    ? "text-[#00482B] font-extrabold after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[2.5px] after:bg-[#00482B]"
                    : "hover:text-[#00482B]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Controls: Desktop & Mobile View */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Social Icons (Phone + Desktop) */}
          <div className="flex items-center">
            {renderSocialIcons()}
          </div>

          {/* "Get a Quote" Button (Phone + Desktop) */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#00482B] text-white text-[11px] sm:text-xs md:text-[13px] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-[#003822] transition shadow-xs whitespace-nowrap"
          >
            Get a Quote
          </Link>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-800 p-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-4 flex flex-col gap-3 shadow-lg">
          {menuList.map((item) => {
            if (item.children && item.children.length > 0) {
              return (
                <div key={item.label} className="border-b border-neutral-100 pb-2">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full py-1 text-left font-bold text-sm text-[#00482B] cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180 text-[#00482B]" : "text-neutral-500"
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="pl-4 flex flex-col gap-2.5 mt-2 border-l-2 border-[#00482B]/20">
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-bold text-[#00482B] py-0.5 uppercase tracking-wider"
                      >
                        ALL SERVICES
                      </Link>
                      {item.children.map((child: any) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-neutral-600 hover:text-[#00482B] transition py-0.5"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-semibold text-sm py-1.5 transition ${
                  isActive ? "text-[#00482B] font-bold" : "text-neutral-800 hover:text-[#00482B]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Additional Action row inside open mobile drawer */}
          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#00482B] text-white font-bold py-2.5 rounded-full text-xs uppercase tracking-wider"
            >
              Get a Quote
            </Link>
            <div className="flex justify-center pt-1">
              {renderSocialIcons(true)}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}