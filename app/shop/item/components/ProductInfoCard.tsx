"use client";

import type { FullProductDetail, ProductReview } from "../../data/product-detail";
import {
  getProductUserReviews,
  userReviewToProductReview,
} from "@/lib/reviews/userReviewsStorage";
import { useWishlist } from "@/lib/wishlist/WishlistContext";
import {
  Heart,
  Minus,
  Pencil,
  Plus,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

function StarRow({
  rating,
  size = "md",
  variant = "light",
}: {
  rating: number;
  size?: "sm" | "md";
  variant?: "light" | "dark";
}) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const empty =
    variant === "dark" ? "text-neutral-600" : "text-neutral-300";
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${cls} ${
            rating >= i + 1
              ? "fill-amber-400 text-amber-400"
              : rating >= i + 0.5
                ? "fill-amber-400/70 text-amber-400"
                : empty
          }`}
        />
      ))}
    </span>
  );
}

type ProductInfoCardProps = {
  product: FullProductDetail;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onShare: () => void;
};

const INITIAL_REVIEWS_SHOWN = 5;

export default function ProductInfoCard({
  product,
  quantity,
  onQuantityChange,
  onShare,
}: ProductInfoCardProps) {
  const { isInWishlist, toggleItem, hydrated: wishlistHydrated } = useWishlist();
  const inWishlist = wishlistHydrated && isInWishlist(product.id);
  const [couponsExpanded, setCouponsExpanded] = useState(false);
  const [reviewSort, setReviewSort] = useState<"highest" | "newest">("highest");
  const [userReviews, setUserReviews] = useState<ProductReview[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const stored = getProductUserReviews(product.id).map(userReviewToProductReview);
    setUserReviews(stored);
  }, [product.id]);

  const mergedReviewCount = product.reviewCount + userReviews.length;

  const sortedReviews = useMemo(() => {
    if (reviewSort === "highest") {
      return [...userReviews, ...product.reviews].sort(
        (a, b) => b.rating - a.rating
      );
    }
    return [...userReviews, ...[...product.reviews].reverse()];
  }, [userReviews, product.reviews, reviewSort]);

  const lineTotal = product.price * quantity;
  const mrpTotal = product.oldPrice * quantity;
  const hasValidDiscount = product.oldPrice > product.price + 0.005;
  const youSave = hasValidDiscount ? mrpTotal - lineTotal : 0;

  const visibleReviews = showAllReviews
    ? sortedReviews
    : sortedReviews.slice(0, INITIAL_REVIEWS_SHOWN);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-6 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
          {product.title}
        </h1>
        <button
          type="button"
          onClick={onShare}
          className="shrink-0 rounded-full border border-neutral-200 bg-white p-2.5 text-neutral-500 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <StarRow rating={product.ratingAvg} variant="light" />
        <span className="text-neutral-600">
          ({mergedReviewCount} Reviews)
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:inline" aria-hidden />
        <span
          className={`inline-flex items-center gap-1.5 font-medium ${
            product.inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              product.inStock ? "bg-green-600" : "bg-red-500"
            }`}
            aria-hidden
          />
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
        {product.onSale && (
          <span className="rounded-full bg-[#66BB6A] px-2.5 py-0.5 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </div>

      <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5">
        <p className="text-3xl font-bold tabular-nums text-neutral-900">
          ₹{lineTotal.toFixed(2)}
        </p>
        {quantity > 1 && (
          <p className="mt-1 text-sm text-neutral-600">
            ₹{product.price.toFixed(2)} each × {quantity}{" "}
            {quantity === 1 ? "item" : "items"}
          </p>
        )}
        {hasValidDiscount && youSave > 0 && (
          <div className="mt-3">
            <span className="inline-block rounded-md bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800 ring-1 ring-green-200/80">
              You saved ₹{youSave.toFixed(2)}
            </span>
          </div>
        )}
        {hasValidDiscount ? (
          <p className="mt-3 text-sm text-neutral-600">
            <span className="line-through text-neutral-400">
              MRP ₹{mrpTotal.toFixed(2)}
            </span>
            <span className="ml-2 text-neutral-500">(incl. of all taxes)</span>
          </p>
        ) : (
          <p className="mt-3 text-sm text-neutral-500">(incl. of all taxes)</p>
        )}
      </div>

      <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-900">
            Coupons &amp; Offers
          </span>
          <button
            type="button"
            onClick={() => setCouponsExpanded((e) => !e)}
            className="text-xs font-semibold uppercase tracking-wide text-[#C8F04C] hover:underline"
          >
            {couponsExpanded ? "See less" : "See all"}
          </button>
        </div>
        <ul className="space-y-2.5 text-sm text-neutral-700">
          {(couponsExpanded ? product.coupons : product.coupons.slice(0, 2)).map(
            (c, idx) => (
              <li key={c.id} className="flex gap-2">
                <span className="font-bold text-[#C8F04C] shrink-0">•</span>
                <span>
                  {c.text}
                  {idx === 0 && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-green-600">
                      Applied
                    </span>
                  )}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white">
          <button
            type="button"
            className="rounded-l-full p-2.5 text-neutral-600 transition-colors hover:bg-neutral-50"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="min-w-[2.5rem] text-center font-semibold tabular-nums text-neutral-900">
            {quantity}
          </span>
          <button
            type="button"
            className="rounded-r-full p-2.5 text-neutral-600 transition-colors hover:bg-neutral-50"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            const wasIn = wishlistHydrated && isInWishlist(product.id);
            toggleItem({
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              oldPrice: product.oldPrice,
              onSale: product.onSale,
            });
            toast.success(
              wasIn ? "Removed from wishlist" : "Saved to wishlist",
              { duration: 2000 }
            );
          }}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            inWishlist
              ? "border-rose-300 bg-rose-50 text-rose-600"
              : "border-neutral-200 text-neutral-600 hover:border-[#C8F04C] hover:text-neutral-900"
          }`}
          aria-pressed={inWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      <div id="reviews" className="border-t border-neutral-100 pt-8 scroll-mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold tabular-nums text-neutral-900">
                {product.ratingAvg.toFixed(1)}
              </span>
              <StarRow rating={product.ratingAvg} variant="light" />
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              Based on {mergedReviewCount} reviews
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/shop/item/${product.id}/review`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#C8F04C] bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#C8F04C]/15"
            >
              <Pencil className="h-4 w-4" />
              Write a review
            </Link>
            <select
              value={reviewSort}
              onChange={(e) =>
                setReviewSort(e.target.value as "highest" | "newest")
              }
              className="rounded-lg border border-neutral-200 bg-white py-2.5 pl-3 pr-8 text-sm font-medium text-neutral-900 focus:border-[#C8F04C] focus:outline-none focus:ring-2 focus:ring-[#C8F04C]/25"
            >
              <option value="highest">Highest Ratings</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          {visibleReviews.map((r: ProductReview) => (
            <li
              key={r.id}
              className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 sm:p-5"
            >
              <div className="flex gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white"
                  aria-hidden
                >
                  {r.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-neutral-900">
                      {r.author}
                    </span>
                    {r.verified && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-800">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5">
                    <StarRow rating={r.rating} size="sm" variant="light" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {r.comment}
                  </p>
                  {r.imageUrl && (
                    <div className="relative mt-3 h-40 max-w-sm overflow-hidden rounded-lg border border-neutral-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.imageUrl}
                        alt="Customer photo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-4 border-t border-neutral-200/80 pt-3 text-xs text-neutral-500">
                    <span>{r.ago}</span>
                    <span className="flex gap-1">
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-800"
                        aria-label="Helpful"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-800"
                        aria-label="Not helpful"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {sortedReviews.length > INITIAL_REVIEWS_SHOWN && (
          <button
            type="button"
            onClick={() => setShowAllReviews((v) => !v)}
            className="mt-6 w-full rounded-lg border border-neutral-200 bg-white py-3 text-center text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            {showAllReviews
              ? "Show fewer reviews"
              : `View all reviews (${sortedReviews.length})`}
          </button>
        )}
      </div>
    </div>
  );
}
