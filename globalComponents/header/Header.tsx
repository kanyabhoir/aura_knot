"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useCart } from "@/lib/cart/CartContext";
import { useWishlist } from "@/lib/wishlist/WishlistContext";
import { menus } from "@/utils/Menus";
import { ChevronDown, Heart, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import LoginModal from "../auth/LoginModal";
import AnnouncementBar from "../announcementBar/AnnouncementBar";
import MegaMenu from "../megaMenu/MegaMenu";
import SearchOverlay from "../searchOverlay/SearchOverlay";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isGuest = !user;

  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const shopTriggerRef = useRef<HTMLDivElement>(null);
  const megaMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount, hydrated: wishlistHydrated } = useWishlist();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalVariant, setAuthModalVariant] = useState<
    "login" | "register"
  >("login");

  const openLoginModal = () => {
    setAuthModalVariant("login");
    setAuthModalOpen(true);
  };
  const openRegisterModal = () => {
    setAuthModalVariant("register");
    setAuthModalOpen(true);
  };

  const clearCloseTimeout = () => {
    if (megaMenuCloseTimeoutRef.current) {
      clearTimeout(megaMenuCloseTimeoutRef.current);
      megaMenuCloseTimeoutRef.current = null;
    }
  };

  const handleMegaMenuLeave = () => {
    clearCloseTimeout();
    megaMenuCloseTimeoutRef.current = setTimeout(
      () => setMegaMenuOpen(false),
      150
    );
  };

  const handleMegaMenuEnter = () => {
    clearCloseTimeout();
    setMegaMenuOpen(true);
  };

  const navLinkClass = (href: string, isHome?: boolean) => {
    const active = isHome ? pathname === "/" : pathname === href;
    if (active) {
      return "text-neutral-900 bg-[#CFFF00]/90 px-3 py-1.5 rounded-md text-sm font-semibold";
    }
    return "text-neutral-200 text-sm font-medium hover:text-[#C8F04C] transition-colors";
  };

  const iconBtnGuest =
    "relative p-2 text-neutral-300 hover:text-white transition-colors";
  const iconLinkLoggedIn =
    "relative p-2 rounded-full text-neutral-300 hover:bg-white/10 hover:text-white transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-neutral-950 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.65)]">
      <AnnouncementBar variant="dark" />
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
              className="shrink-0 text-xl font-bold text-[#C8F04C] tracking-tight"
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
                      className={`inline-flex items-center gap-1 transition-colors ${
                        megaMenuOpen
                          ? "text-neutral-900 bg-[#C8F04C] px-3 py-1.5 rounded-md text-sm font-semibold"
                          : "text-sm font-medium text-neutral-200 hover:text-[#C8F04C]"
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
                    className={navLinkClass(item.link, item.link === "/")}
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
                className="relative w-full flex items-center rounded-full bg-white py-2.5 pl-4 pr-10 text-sm text-left text-neutral-500 shadow-sm hover:bg-neutral-100 transition-colors"
              >
                <span className="flex-1 truncate">Search products...</span>
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSearchOverlayOpen(true)}
              className="sm:hidden p-2 text-neutral-200 hover:text-white transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {isGuest ? (
                <div className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-neutral-300">
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="hover:text-[#C8F04C] transition-colors px-1"
                  >
                    Log in
                  </button>
                  <span className="text-neutral-600">/</span>
                  <button
                    type="button"
                    onClick={openRegisterModal}
                    className="hover:text-[#C8F04C] transition-colors px-1"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    href="/account"
                    className="text-sm font-semibold text-neutral-200 hover:text-[#C8F04C] transition-colors max-w-[120px] truncate"
                  >
                    {user.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="text-xs font-medium text-neutral-500 hover:text-white transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}

              {isGuest ? (
                <button
                  type="button"
                  onClick={openLoginModal}
                  className={`${iconLinkLoggedIn}`}
                  aria-label="Log in"
                >
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  href="/account"
                  className={iconLinkLoggedIn}
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              <Link
                href="/wishlist"
                className={`${iconBtnGuest} rounded-full hover:bg-white/10`}
                aria-label={`Wishlist${wishlistHydrated && wishlistCount > 0 ? `, ${wishlistCount} saved` : ""}`}
              >
                <Heart
                  className={`w-5 h-5 ${wishlistHydrated && wishlistCount > 0 ? "fill-rose-500/20 text-rose-400" : ""}`}
                />
                {wishlistHydrated && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white tabular-nums">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className={`${iconBtnGuest} rounded-full hover:bg-white/10`}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="md:hidden flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-3 pb-3">
            {menus.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="text-xs font-medium text-neutral-400 hover:text-[#C8F04C]"
              >
                {item.menu}
              </Link>
            ))}
            {isGuest ? (
              <>
                <span className="text-neutral-700">·</span>
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="text-xs font-semibold uppercase tracking-wide text-[#C8F04C]"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="text-xs font-semibold uppercase tracking-wide text-[#C8F04C]"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <span className="text-neutral-700">·</span>
                <Link
                  href="/account"
                  className="text-xs font-semibold text-[#C8F04C]"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-xs font-medium text-neutral-500 hover:text-white"
                >
                  Log out
                </button>
              </>
            )}
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

      {isGuest && (
        <LoginModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          variant={authModalVariant}
        />
      )}
    </header>
  );
}
