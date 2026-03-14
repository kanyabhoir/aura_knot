"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

const slides = [
  {
    title: "WINTER SALE",
    subtitle: "UP TO 70% OFF",
    image: "/images/imgae1.jpg",
    alt: "Shopping with colorful bags",
  },
  {
    title: "HANDMADE ART",
    subtitle: "UNIQUE PIECES FOR YOU",
    image: "/images/Crochet.jpg",
    alt: "Handmade crafts",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-sky-100 to-white">
      <div
        className="relative flex transition-transform duration-500 ease-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-8 md:px-12 lg:px-16 py-10 md:py-14"
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 tracking-tight">
                {slide.title}
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-red-500">
                {slide.subtitle}
              </p>
            </div>
            <div className="relative w-full max-w-md aspect-[4/3] md:max-w-lg order-1 md:order-2">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-contain"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-neutral-700" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-neutral-700" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-neutral-800" : "w-2 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
