"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";

type ProductFeaturesCarouselProps = {
  products: ProductCardProps[];
  className?: string;
};

export default function ProductFeaturesCarousel({
  products,
  className = "",
}: ProductFeaturesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => checkScroll());
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkScroll, products]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 24;
    const step = Math.min(cardWidth * 2, el.clientWidth * 0.85);
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px]"
          >
            <ProductCard {...product} minimal />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous products"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-600 shadow-sm transition-all hover:border-neutral-300 hover:shadow disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next products"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-600 shadow-sm transition-all hover:border-neutral-300 hover:shadow disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
