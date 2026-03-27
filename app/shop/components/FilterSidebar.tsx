"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ShopCategory } from "../data/catalog";
import { CATEGORY_LABELS, PRICE_MAX_DEFAULT, PRICE_MIN_DEFAULT } from "../data/catalog";

type FilterSidebarProps = {
  inStockCount: number;
  outOfStockCount: number;
  filterInStock: boolean;
  filterOutOfStock: boolean;
  onInStockChange: (v: boolean) => void;
  onOutOfStockChange: (v: boolean) => void;
  priceMin: number;
  priceMax: number;
  onPriceMinChange: (v: number) => void;
  onPriceMaxChange: (v: number) => void;
  categoryFilters: Record<ShopCategory, boolean>;
  onCategoryToggle: (c: ShopCategory) => void;
};

function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-100 pb-4 mb-4 last:border-0 last:mb-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left font-semibold text-neutral-900 py-1"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  inStockCount,
  outOfStockCount,
  filterInStock,
  filterOutOfStock,
  onInStockChange,
  onOutOfStockChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  categoryFilters,
  onCategoryToggle,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-neutral-900 mb-1">Filter</h2>

      <AccordionSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterInStock}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="rounded border-neutral-300 text-[#C8F04C] focus:ring-[#C8F04C]"
          />
          <span className="text-sm text-neutral-700">
            In Stock ({inStockCount})
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterOutOfStock}
            onChange={(e) => onOutOfStockChange(e.target.checked)}
            className="rounded border-neutral-300 text-[#C8F04C] focus:ring-[#C8F04C]"
          />
          <span className="text-sm text-neutral-700">
            Out of Stock ({outOfStockCount})
          </span>
        </label>
      </AccordionSection>

      <AccordionSection title="Price">
        <div className="space-y-3">
          <input
            type="range"
            min={PRICE_MIN_DEFAULT}
            max={PRICE_MAX_DEFAULT}
            value={priceMax}
            onChange={(e) =>
              {
                const v = Number(e.target.value);
                if (v >= priceMin) onPriceMaxChange(v);
              }
            }
            className="w-full accent-[#C8F04C]"
          />
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="text-xs text-neutral-500 block mb-1">Min</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={PRICE_MIN_DEFAULT}
                  max={priceMax}
                  value={priceMin}
                  onChange={(e) =>
                    onPriceMinChange(
                      Math.min(Number(e.target.value), priceMax)
                    )
                  }
                  className="w-full rounded-lg border border-neutral-200 pl-6 pr-2 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-neutral-500 block mb-1">Max</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={priceMin}
                  max={PRICE_MAX_DEFAULT}
                  value={priceMax}
                  onChange={(e) =>
                    onPriceMaxChange(
                      Math.max(Number(e.target.value), priceMin)
                    )
                  }
                  className="w-full rounded-lg border border-neutral-200 pl-6 pr-2 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection title="Product Type">
        {(Object.keys(CATEGORY_LABELS) as ShopCategory[]).map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={categoryFilters[cat]}
              onChange={() => onCategoryToggle(cat)}
              className="rounded border-neutral-300 text-[#C8F04C] focus:ring-[#C8F04C]"
            />
            <span className="text-sm text-neutral-700">
              {CATEGORY_LABELS[cat]}
            </span>
          </label>
        ))}
      </AccordionSection>
    </aside>
  );
}
