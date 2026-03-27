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
  /** Minimal, borderless style for homepage featured carousel */
  minimal?: boolean;
};

export default function ProductCard({
  image,
  title,
  oldPrice,
  price,
  slug = "#",
  onSale = true,
  minimal = false,
}: ProductCardProps) {
  if (minimal) {
    return (
      <Link
        href={slug}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 rounded-xl"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-neutral-100 shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 group-hover:shadow-md group-hover:ring-black/[0.06]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          />
          {onSale && (
            <span className="absolute top-2.5 left-2.5 rounded-full bg-[#66BB6A] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              Sale
            </span>
          )}
        </div>
        <h3 className="mt-3 text-[15px] font-medium leading-snug text-neutral-900 line-clamp-2 transition-colors group-hover:text-neutral-700">
          {title}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
          <span className="text-sm text-neutral-400 line-through">
            ₹{oldPrice.toFixed(2)}
          </span>
          <span className="text-base font-bold text-black">
            ₹{price.toFixed(2)}
          </span>
        </div>
      </Link>
    );
  }

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
          <span className="absolute top-2 left-2 rounded-full bg-[#66BB6A] px-2 py-0.5 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-neutral-900 line-clamp-2 group-hover:text-[#C8F04C] transition-colors">
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
