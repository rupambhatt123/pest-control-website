"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  return (
    <section className="bg-[#00482B] text-white py-16 md:py-24 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-200"
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <div key={index} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-white font-medium" : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight size={14} className="text-white/60" />}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}