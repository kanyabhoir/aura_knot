"use client";

import { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import type { ProductCardProps } from "./ProductCard";

const categories = [
  "Deals",
  "Fancy Pens",
  "Gift Bags",
  "Journals",
  "Backpacks",
  "Office Desks",
];

const suggestionProducts: ProductCardProps[] = [
  {
    id: "s1",
    image: "/images/Crochet.jpg",
    title: "Handmade Penguin Pouch",
    oldPrice: 450,
    price: 380,
    onSale: true,
  },
  {
    id: "s2",
    image: "/images/Quiling.jpg",
    title: "Floral Wool Phone Dock",
    oldPrice: 500,
    price: 399,
    onSale: true,
  },
  {
    id: "s3",
    image: "/images/imgae1.jpg",
    title: "Hand-Knit Bird Phone Case",
    oldPrice: 400,
    price: 350,
    onSale: true,
  },
  {
    id: "s4",
    image: "/images/Sketch.jpg",
    title: "Sketch Art Set",
    oldPrice: 550,
    price: 449,
    onSale: true,
  },
];

export default function SuggestionSection() {
  const [activeCategory, setActiveCategory] = useState("Deals");

  return (
    <section className="bg-neutral-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              Suggestions For You
            </h2>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-[#CFFF00] text-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className="lg:col-span-3">
            <ProductCarousel products={suggestionProducts} />
          </div>
        </div>
      </div>
    </section>
  );
}
