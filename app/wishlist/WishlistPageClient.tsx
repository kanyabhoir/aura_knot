"use client";

import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import { useCart } from "@/lib/cart/CartContext";
import type { WishlistItem } from "@/lib/wishlist/WishlistContext";
import { useWishlist } from "@/lib/wishlist/WishlistContext";
import {
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function money(n: number) {
  return `₹${n.toFixed(2)}`;
}

function WishlistRow({
  item,
  onRemove,
  onAddToCart,
}: {
  item: WishlistItem;
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6">
      {item.onSale && (
        <span className="absolute right-3 top-3 rounded-full bg-[#66BB6A] px-2.5 py-0.5 text-xs font-medium text-white sm:right-4 sm:top-4">
          Sale
        </span>
      )}
      <Link
        href={`/shop/item/${item.id}`}
        className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:mx-0 sm:h-32 sm:w-32"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="144px"
        />
      </Link>
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <Link
          href={`/shop/item/${item.id}`}
          className="font-semibold text-neutral-900 transition-colors hover:text-[#C8F04C] line-clamp-2"
        >
          {item.title}
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2 sm:justify-start">
          <span className="text-lg font-bold text-neutral-900">
            {money(item.price)}
          </span>
          {item.oldPrice > item.price && (
            <span className="text-sm text-neutral-400 line-through">
              {money(item.oldPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:shrink-0 sm:items-end">
        <button
          type="button"
          onClick={onAddToCart}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to bag
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function WishlistPageClient() {
  const { items, hydrated, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      oldPrice: item.oldPrice,
      onSale: item.onSale,
      qty: 1,
    });
    toast.success("Added to bag");
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2200 }} />
      <div className="bg-neutral-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Wishlist", href: "/wishlist" },
            ]}
          />
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Your wishlist
              </h1>
              <p className="mt-1 text-sm text-neutral-600">
                {hydrated
                  ? items.length === 0
                    ? "Save pieces you love and come back anytime."
                    : `${items.length} saved ${items.length === 1 ? "item" : "items"}`
                  : "Loading…"}
              </p>
            </div>
            {hydrated && items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearWishlist();
                  toast.success("Wishlist cleared");
                }}
                className="self-start text-sm font-medium text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline sm:self-auto"
              >
                Clear all
              </button>
            )}
          </div>

          {!hydrated && (
            <div className="mt-10 space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl bg-neutral-200/80"
                />
              ))}
            </div>
          )}

          {hydrated && items.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <Heart className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-lg font-semibold text-neutral-900">
                Nothing saved yet
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-600">
                Tap the heart on any product to save it here. Your list syncs on
                this device.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#C8F04C] px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#d4f25f]"
              >
                Browse shop
              </Link>
            </div>
          )}

          {hydrated && items.length > 0 && (
            <ul className="mt-8 space-y-4">
              {items.map((item) => (
                <li key={item.id}>
                  <WishlistRow
                    item={item}
                    onRemove={() => {
                      removeItem(item.id);
                      toast.success("Removed from wishlist");
                    }}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
