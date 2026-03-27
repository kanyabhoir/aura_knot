"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="w-4 h-4 text-neutral-400" aria-hidden />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#C8F04C] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-neutral-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
