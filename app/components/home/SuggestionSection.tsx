"use client";

import { useMemo, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import type { ProductCardProps } from "./ProductCard";
import { SHOP_PRODUCTS, type ShopProduct } from "@/app/shop/data/catalog";

const categories = [
  { id: "quilling", label: "Quilling" },
  { id: "sketch", label: "Sketch" },
  { id: "mandala", label: "Mandala" },
  { id: "wool", label: "Wool art" },
] as const;

type TabId = (typeof categories)[number]["id"];

function toCard(p: ShopProduct): ProductCardProps {
  return {
    id: p.id,
    image: p.image,
    title: p.title,
    oldPrice: p.oldPrice,
    price: p.price,
    onSale: p.onSale,
    slug: `/shop/item/${p.id}`,
  };
}

/** Mandala tab: radial / ornate quilling cues */
const MANDALA_TITLE_RE =
  /\b(mandala|sunburst|tree of life|floral quilling wall)\b/i;

function productsForTab(tab: TabId): ProductCardProps[] {
  if (tab === "wool") {
    return SHOP_PRODUCTS.filter((p) => p.category === "woolen").map(toCard);
  }
  if (tab === "sketch") {
    return SHOP_PRODUCTS.filter((p) => p.category === "sketch").map(toCard);
  }
  if (tab === "mandala") {
    const list = SHOP_PRODUCTS.filter(
      (p) => p.category === "quilling" && MANDALA_TITLE_RE.test(p.title)
    );
    return list.length > 0
      ? list.map(toCard)
      : SHOP_PRODUCTS.filter((p) => p.category === "quilling")
          .slice(0, 6)
          .map(toCard);
  }
  return SHOP_PRODUCTS.filter(
    (p) => p.category === "quilling" && !MANDALA_TITLE_RE.test(p.title)
  ).map(toCard);
}

export default function SuggestionSection() {
  const [activeTab, setActiveTab] = useState<TabId>("quilling");

  const products = useMemo(() => productsForTab(activeTab), [activeTab]);

  return (
    <section className="bg-neutral-100 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-black/[0.04]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
            <aside className="lg:col-span-1">
              <h2 className="text-lg font-bold text-neutral-900 mb-4 sm:text-xl">
                Suggestions For You
              </h2>
              <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-2">
                {categories.map(({ id, label }) => (
                  <li key={id} className="lg:w-full">
                    <button
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`w-full rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        activeTab === id
                          ? "bg-[#C8F04C] text-neutral-900 shadow-sm"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="lg:col-span-3 min-w-0">
              <ProductCarousel products={products} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
