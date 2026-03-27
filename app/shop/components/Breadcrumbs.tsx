"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  variant?: "default" | "dark";
};

export default function Breadcrumbs({
  items,
  variant = "default",
}: BreadcrumbsProps) {
  const isDark = variant === "dark";
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-500"}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight
                className={`w-4 h-4 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}
                aria-hidden
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#C8F04C] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`font-medium ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
