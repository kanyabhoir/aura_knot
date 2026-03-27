"use client";

import { useCart } from "@/lib/cart/CartContext";
import { menus } from "@/utils/Menus";
import { ChevronDown, Heart, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import AnnouncementBar from "../announcementBar/AnnouncementBar";
import MegaMenu from "../megaMenu/MegaMenu";
import SearchOverlay from "../searchOverlay/SearchOverlay";

export default function Header() {
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const shopTriggerRef = useRef<HTMLDivElement>(null);
  const megaMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { itemCount: cartCount } = useCart();

  const clearCloseTimeout = () => {
    if (megaMenuCloseTimeoutRef.current) {
      clearTimeout(megaMenuCloseTimeoutRef.current);
      megaMenuCloseTimeoutRef.current = null;
    }
  };

  const handleMegaMenuLeave = () => {
    clearCloseTimeout();
    megaMenuCloseTimeoutRef.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  const handleMegaMenuEnter = () => {
    clearCloseTimeout();
    setMegaMenuOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <AnnouncementBar />
      <div
        className="relative"
        onMouseLeave={handleMegaMenuLeave}
        onMouseEnter={clearCloseTimeout}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 py-4">
            <Link
              href="/"
              onClick={() => setMegaMenuOpen(false)}
              className="text-xl font-bold text-[#CFFF00] bg-neutral-900 px-2 py-1 rounded shrink-0"
            >
              KANNYA.art
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {menus.map((item) =>
                item.menu === "Shop" ? (
                  <div
                    key={item.link}
                    ref={shopTriggerRef}
                    onMouseEnter={handleMegaMenuEnter}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => setMegaMenuOpen((prev) => !prev)}
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#C8F04C] ${
                        megaMenuOpen
                          ? "text-neutral-900 bg-[#C8F04C] px-2 py-1 rounded"
                          : "text-neutral-700"
                      }`}
                      aria-expanded={megaMenuOpen}
                      aria-haspopup="true"
                    >
                      {item.menu}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setMegaMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-[#CFFF00] ${
                      item.link === "/"
                        ? "text-neutral-900 bg-[#CFFF00]/20 px-2 py-1 rounded"
                        : "text-neutral-700"
                    }`}
                  >
                    {item.menu}
                  </Link>
                )
              )}
            </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <button
              type="button"
              onClick={() => setSearchOverlayOpen(true)}
              className="relative w-full flex items-center rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-3 pr-9 text-sm text-left text-neutral-500 hover:border-neutral-300 transition-colors"
            >
              <span className="flex-1 truncate">Search products...</span>
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSearchOverlayOpen(true)}
            className="sm:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/account"
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/wishlist"
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu placeholder - can expand later */}
        <div className="md:hidden flex gap-2 pb-2">
          {menus.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="text-xs font-medium text-neutral-600 hover:text-[#CFFF00]"
            >
              {item.menu}
            </Link>
          ))}
        </div>
      </nav>

        <MegaMenu
          isOpen={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
          anchorRef={shopTriggerRef}
        />
      </div>

      <SearchOverlay
        isOpen={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
      />
    </header>
  );
}
