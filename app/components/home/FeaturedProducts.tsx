"use client";

import { useState } from "react";
import ProductFeaturesCarousel from "./ProductFeaturesCarousel";
import type { ProductCardProps } from "./ProductCard";

const featuredProducts: ProductCardProps[] = [
  {
    id: "1",
    image: "/images/imgae1.jpg",
    title: "Hand-Knit Bird Phone Case",
    oldPrice: 400,
    price: 350,
    onSale: true,
    slug: "/shop/item/1",
  },
  {
    id: "2",
    image: "/images/Crochet.jpg",
    title: "Handmade Penguin Pouch",
    oldPrice: 450,
    price: 380,
    onSale: true,
    slug: "/shop/item/2",
  },
  {
    id: "3",
    image: "/images/Crochet.jpg",
    title: "Floral Wool Phone Dock",
    oldPrice: 500,
    price: 399,
    onSale: true,
    slug: "/shop/item/3",
  },
  {
    id: "6",
    image: "/images/Quiling.jpg",
    title: "Tree of Life Quilling Art",
    oldPrice: 1200,
    price: 899,
    onSale: true,
    slug: "/shop/item/6",
  },
];

const tabs = [
  { id: "featured", label: "Featured" },
  { id: "bestseller", label: "Best Seller" },
  { id: "toprated", label: "Top Rated" },
] as const;

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>(
    "featured"
  );

  const products =
    activeTab === "featured"
      ? featuredProducts
      : activeTab === "bestseller"
        ? [...featuredProducts].reverse()
        : featuredProducts;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
          aria-label="Product collections"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-1 text-sm sm:text-base transition-colors ${
                  isActive
                    ? "font-bold text-black"
                    : "font-medium text-neutral-400 hover:text-neutral-500"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-black"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-10 sm:mt-12">
          <ProductFeaturesCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
