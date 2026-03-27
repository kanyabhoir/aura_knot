"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ShopPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ShopPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  const show = new Set<number>();
  show.add(1);
  show.add(totalPages);
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= totalPages) show.add(i);
  }
  const sorted = [...show].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    pages.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      pages.push("ellipsis");
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        PREVIOUS
      </button>
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`e-${idx}`} className="px-2 text-neutral-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-[2.5rem] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              currentPage === p
                ? "bg-[#C8F04C] text-neutral-900"
                : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        NEXT
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
