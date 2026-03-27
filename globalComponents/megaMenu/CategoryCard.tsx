"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  onNavigate?: () => void;
};

export default function CategoryCard({
  href,
  image,
  imageAlt,
  title,
  onNavigate,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      onClick={() => onNavigate?.()}
      className="group block rounded-2xl overflow-hidden bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C8F04C] focus:ring-offset-2"
    >
      <div className="relative aspect-[4/5] min-h-[200px] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Glassmorphism overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-black/40 backdrop-blur-md px-4 py-4 flex items-center justify-center gap-2">
          <span className="text-white font-semibold text-sm sm:text-base text-center">
            {title}
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
