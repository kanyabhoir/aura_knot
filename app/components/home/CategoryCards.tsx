"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    image: "/images/Quiling.jpg",
    title: "Add a Touch of Handmade Beauty",
    subtitle: "Explore Unique Quilling Art Pieces",
    href: "/shop?category=quilling",
    badge: "Sale Up To 20%-OFF",
  },
  {
    image: "/images/Crochet.jpg",
    title: "Threads That Tell a Story",
    subtitle: "Handcrafted Wool Art Made with Heart",
    href: "/shop?category=wool",
  },
  {
    image: "/images/Sketch.jpg",
    title: "Drawn from the Heart",
    subtitle: "Our detailed sketches crafted by passionate hands",
    href: "/shop?category=sketches",
  },
];

export default function CategoryCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Link
          href={cards[0].href}
          className="relative group overflow-hidden rounded-2xl shadow-lg lg:col-span-2 aspect-[2/1] min-h-[220px]"
        >
          <Image
            src={cards[0].image}
            alt={cards[0].title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl md:text-2xl font-bold">{cards[0].title}</h2>
            <p className="text-sm text-white/90 mt-1">{cards[0].subtitle}</p>
            <span className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#CFFF00] text-black text-sm font-medium rounded-lg hover:bg-[#b8e600] transition-colors">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </span>
            {cards[0].badge && (
              <p className="mt-2 text-xs text-white/80">{cards[0].badge}</p>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-4">
          {cards.slice(1).map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="relative group overflow-hidden rounded-2xl shadow-lg flex-1 min-h-[200px]"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h2 className="text-lg font-bold">{card.title}</h2>
                <p className="text-sm text-white/90 mt-0.5">{card.subtitle}</p>
                <span className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-[#CFFF00] text-black text-sm font-medium rounded-lg hover:bg-[#b8e600] transition-colors">
                  Shop Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
