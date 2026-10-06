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

  // Fallback agar JSON ke services section me items na milein
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

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-[86px] flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={headerData?.logoImage || headerData?.logo || "/logo.jpeg"}
            alt={common?.siteName || "PestControl"}
            width={220}
            height={55}
            priority
            className="h-11 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Center Navigation Links - Desktop View */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] xl:text-[15px] font-bold tracking-normal text-neutral-800">
          {menuList.map((item) => {
            // Dropdown Menu (SERVICES)
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
                        ? "text-[#00482B] font-extrabold after:absolute after:bottom-4 after:left-0 after:w-full after:h-[2.5px] after:bg-[#00482B]"
                        : "hover:text-[#00482B]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={15}
                      strokeWidth={2.6}
                      className={`transition-transform duration-200 ${
                        servicesDropdownOpen ? "rotate-180 text-[#00482B]" : "text-neutral-700"
                      }`}
                    />
                  </div>

                  {/* Dropdown Box on Hover */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-[76px] left-0 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 py-2.5 z-50">
                      {/* "ALL SERVICES" link */}
                      <Link
                        href={item.href}
                        className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00482B] bg-[#f0f8f4] hover:bg-[#e2f1ea] border-b border-neutral-100 transition"
                      >
                        ALL SERVICES
                      </Link>

                      {/* Dynamic Services list */}
                      <div className="max-h-[320px] overflow-y-auto">
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

            // Normal Top Links (HOME, ABOUT US, BLOG, etc.)
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

        {/* Right Side: Social Media Icons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={common?.socialLinks?.facebook || "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-10 h-10 rounded-full bg-[#00482B] text-white flex items-center justify-center hover:bg-[#063321] transition shadow-sm"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          <a
            href={common?.socialLinks?.instagram || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-10 h-10 rounded-full bg-[#00482B] text-white flex items-center justify-center hover:bg-[#063321] transition shadow-sm"
          >
            <svg
              width="15"
              height="15"
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
            className="w-10 h-10 rounded-full bg-[#00482B] text-white flex items-center justify-center hover:bg-[#063321] transition shadow-sm"
          >
            <svg
              width="15"
              height="15"
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-800 p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
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
                      size={18}
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
        </div>
      )}
    </header>
  );
}