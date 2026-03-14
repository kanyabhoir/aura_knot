"use client";

import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  oldPrice: number;
  price: number;
  slug?: string;
  onSale?: boolean;
};

export default function ProductCard({
  image,
  title,
  oldPrice,
  price,
  slug = "#",
  onSale = true,
}: ProductCardProps) {
  return (
    <Link
      href={slug}
      className="group block rounded-2xl bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
        {onSale && (
          <span className="absolute top-2 left-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
            Sale
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-neutral-900 line-clamp-2 group-hover:text-[#CFFF00]/90 transition-colors">
        {title}
      </h3>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-neutral-400 line-through">
          ₹{oldPrice.toFixed(2)}
        </span>
        <span className="font-bold text-neutral-900">₹{price.toFixed(2)}</span>
      </div>
    </Link>
  );
}
