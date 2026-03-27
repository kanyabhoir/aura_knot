"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    image: "/images/Quiling.jpg",
    title: "Add a Touch of Handmade Beauty",
    subtitle: "Explore Unique Quilling Art Pieces",
    href: "/shop/quilling",
    saleTag: "Sale Up To 20% OFF",
  },
  {
    image: "/images/Crochet.jpg",
    title: "Threads That Tell a Story",
    subtitle: "Handcrafted Wool Art Made with Heart",
    href: "/shop/woolen",
  },
  {
    image: "/images/Sketch.jpg",
    title: "Drawn from the Heart",
    subtitle: "Own detailed sketches crafted by passionate hands.",
    href: "/shop/sketches",
  },
] as const;

const glassPanel =
  "rounded-2xl border border-white/30 bg-white/[0.15] shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/[0.12]";

function ShopNowButton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-xl bg-[#C8F04C] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-md transition-all duration-300 group-hover:bg-[#d4f25f] group-hover:shadow-lg ${className}`}
    >
      Shop Now
      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
    </span>
  );
}

export default function CategoryCards() {
  const [main, ...side] = cards;

  return (
    <section className="bg-black py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {/* Large left card — spans 2 cols × 2 rows on large screens */}
          <Link
            href={main.href}
            className="group relative min-h-[300px] overflow-hidden rounded-3xl ring-1 ring-white/10 sm:min-h-[360px] lg:col-span-2 lg:row-span-2 lg:min-h-[520px]"
          >
            <Image
              src={main.image}
              alt={main.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5 lg:inset-x-6 lg:bottom-6">
              <div className={`${glassPanel} p-5 sm:p-6 lg:p-7`}>
                <p className="text-xs font-medium uppercase tracking-wide text-white/75 sm:text-sm sm:normal-case sm:tracking-normal">
                  {main.subtitle}
                </p>
                <h2 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
                  {main.title}
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <ShopNowButton />
                  {main.saleTag && (
                    <span className="text-sm font-semibold text-amber-300 drop-shadow-sm">
                      {main.saleTag}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>

          {/* Right stacked cards */}
          {side.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative min-h-[220px] overflow-hidden rounded-3xl ring-1 ring-white/10 sm:min-h-[250px] lg:col-start-3 lg:min-h-0 ${
                i === 0 ? "lg:row-start-1" : "lg:row-start-2"
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <div className={`${glassPanel} p-4 sm:p-5`}>
                  <p className="text-xs font-medium text-white/80 sm:text-sm">
                    {card.subtitle}
                  </p>
                  <h2 className="mt-1.5 text-base font-bold leading-snug text-white sm:text-lg lg:text-xl">
                    {card.title}
                  </h2>
                  <div className="mt-3">
                    <ShopNowButton className="px-3 py-2 text-xs sm:text-sm sm:px-4 sm:py-2.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
