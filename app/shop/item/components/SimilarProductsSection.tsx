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
    <section className="mt-16">
      <h2 className="text-center text-xl font-bold text-neutral-900 mb-8">
        Similar Products
      </h2>
      <ProductCarousel products={products} />
    </section>
  );
}
