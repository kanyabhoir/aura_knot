"use client";

import { X } from "lucide-react";

export type SortOption = "latest" | "priceAsc" | "priceDesc" | "name";

type ShopToolbarProps = {
  showing: number;
  totalCatalog: number;
  categoryLabel: string;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  appliedTags: { id: string; label: string; onRemove: () => void }[];
  onClearAllTags: () => void;
};

export default function ShopToolbar({
  showing,
  totalCatalog,
  categoryLabel,
  sort,
  onSortChange,
  appliedTags,
  onClearAllTags,
}: ShopToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-neutral-700">
            Showing{" "}
            <span className="font-semibold text-neutral-900">{showing}</span>{" "}
            Results from{" "}
            <span className="font-semibold text-neutral-900">
              {totalCatalog}
            </span>{" "}
            for &apos;{categoryLabel}&apos;
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="shop-sort" className="text-sm text-neutral-500">
            Sort by
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-neutral-800 focus:border-[#C8F04C] focus:outline-none focus:ring-1 focus:ring-[#C8F04C]"
          >
            <option value="latest">Latest Products</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {appliedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {appliedTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={tag.onRemove}
              className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-200 transition-colors"
            >
              {tag.label}
              <X className="w-3.5 h-3.5" aria-hidden />
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAllTags}
            className="text-sm font-medium text-red-500 hover:text-red-600"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
