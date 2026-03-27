"use client";

import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
  title: string;
  onBuyNow: () => void;
  onAddToCart: () => void;
  disabled: boolean;
};

export default function ImageGallery({
  images,
  title,
  onBuyNow,
  onAddToCart,
  disabled,
}: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.length ? images : ["/images/imgae1.jpg"];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
        <div className="flex flex-row gap-2 order-2 sm:order-1 sm:flex-col sm:w-[4.75rem] shrink-0 sm:max-h-[min(520px,65vh)] overflow-x-auto sm:overflow-y-auto scrollbar-hide py-0.5">
          {safeImages.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-[4.25rem] w-[4.25rem] sm:h-[4.5rem] sm:w-full shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                active === i
                  ? "ring-2 ring-[#C8F04C] ring-offset-2 ring-offset-white scale-[1.02]"
                  : "ring-1 ring-neutral-200 opacity-80 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="76px"
              />
            </button>
          ))}
        </div>

        <div className="relative order-1 sm:order-2 flex-1 aspect-square max-h-[min(520px,70vw)] rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-sm">
          <Image
            src={safeImages[active]}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 520px"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onBuyNow}
          disabled={disabled}
          className="group w-full rounded-xl bg-[#C8F04C] py-4 text-sm font-bold uppercase tracking-wide text-neutral-900 transition-all hover:bg-[#d4f25f] disabled:opacity-45 disabled:pointer-events-none shadow-sm"
        >
          <span className="inline-flex items-center justify-center gap-2">
            Check out your cart now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={disabled}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 bg-white py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50 disabled:opacity-45 disabled:pointer-events-none"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
