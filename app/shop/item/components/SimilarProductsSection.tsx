"use client";

import ProductCarousel from "@/app/components/home/ProductCarousel";
import type { ProductCardProps } from "@/app/components/home/ProductCard";

type SimilarProductsSectionProps = {
  products: ProductCardProps[];
};

export default function SimilarProductsSection({
  products,
}: SimilarProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-neutral-200 pt-16">
      <h2 className="mb-10 text-center text-xl font-bold text-neutral-900 sm:text-2xl">
        Similar products
      </h2>
      <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 px-2 py-6 sm:px-4">
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
