"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
        <div className="flex flex-row gap-2 order-2 sm:order-1 sm:flex-col sm:w-20 shrink-0 sm:max-h-[480px] overflow-x-auto sm:overflow-y-auto scrollbar-hide">
          {safeImages.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 sm:h-[72px] sm:w-full shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                active === i
                  ? "border-neutral-900 ring-2 ring-[#C8F04C]/60"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        <div className="relative order-1 sm:order-2 flex-1 aspect-square max-h-[520px] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onBuyNow}
          disabled={disabled}
          className="w-full rounded-xl bg-[#C8F04C] py-3.5 font-semibold text-neutral-900 hover:bg-[#b8df3c] disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          Buy Now
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={disabled}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-800 py-3.5 font-semibold text-white hover:bg-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          Add to Cart
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
