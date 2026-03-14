"use client";

import { useEffect, useRef } from "react";
import CategoryCard from "./CategoryCard";

const CATEGORIES = [
  {
    href: "/shop/woolen",
    image: "/images/Crochet.jpg",
    imageAlt: "Woolen handmade phone case",
    title: "Shop Woolen Products →",
  },
  {
    href: "/shop/quilling",
    image: "/images/Quiling.jpg",
    imageAlt: "Quilling tree artwork",
    title: "Shop Quilling Art Products →",
  },
  {
    href: "/shop/sketches",
    image: "/images/Sketch.jpg",
    imageAlt: "Colorful horse sketch",
    title: "Sketches & Arts Products →",
  },
] as const;

type MegaMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
};

export default function MegaMenu({ isOpen, onClose, anchorRef }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      )
        return;
      onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute left-1/2 top-full pt-2 w-[calc(100vw-2rem)] max-w-4xl px-2 sm:px-4 z-50"
      style={{ animation: "megaMenuSlide 0.25s ease-out forwards" }}
    >
      <div className="rounded-2xl bg-[#C8F04C] shadow-xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.href}
              href={cat.href}
              image={cat.image}
              imageAlt={cat.imageAlt}
              title={cat.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
