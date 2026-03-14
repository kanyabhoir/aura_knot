"use client";

import { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import type { ProductCardProps } from "./ProductCard";

const featuredProducts: ProductCardProps[] = [
  {
    id: "1",
    image: "/images/imgae1.jpg",
    title: "Hand-Knit Bird Phone Case",
    oldPrice: 400,
    price: 350,
    onSale: true,
  },
  {
    id: "2",
    image: "/images/Crochet.jpg",
    title: "Handmade Penguin Pouch",
    oldPrice: 450,
    price: 380,
    onSale: true,
  },
  {
    id: "3",
    image: "/images/Quiling.jpg",
    title: "Floral Wool Phone Dock",
    oldPrice: 500,
    price: 399,
    onSale: true,
  },
  {
    id: "4",
    image: "/images/Sketch.jpg",
    title: "Quilling Art Frame",
    oldPrice: 600,
    price: 480,
    onSale: true,
  },
];

const tabs = [
  { id: "featured", label: "Featured" },
  { id: "bestseller", label: "Best Seller" },
  { id: "toprated", label: "Top Rated" },
] as const;

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]["id"]>("featured");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-wrap gap-4 border-b border-neutral-200 pb-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-neutral-900 border-b-2 border-neutral-900 -mb-[17px] pb-4"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ProductCarousel
        products={
          activeTab === "featured"
            ? featuredProducts
            : activeTab === "bestseller"
              ? [...featuredProducts].reverse()
              : featuredProducts
        }
      />
    </section>
  );
}
