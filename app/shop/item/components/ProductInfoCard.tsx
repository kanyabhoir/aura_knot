"use client";

import type { FullProductDetail, ProductReview } from "../../data/product-detail";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useMemo, useState } from "react";

function StarRow({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${cls} ${
            rating >= i + 1
              ? "fill-amber-400 text-amber-400"
              : rating >= i + 0.5
                ? "fill-amber-400/60 text-amber-400"
                : "text-neutral-300"
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

export default function ProductInfoCard({
  product,
  quantity,
  onQuantityChange,
  onShare,
}: ProductInfoCardProps) {
  const [wishlist, setWishlist] = useState(false);
  const [couponsExpanded, setCouponsExpanded] = useState(false);
  const [reviewSort, setReviewSort] = useState<"highest" | "newest">("highest");

  const sortedReviews = useMemo(() => {
    const list = [...product.reviews];
    if (reviewSort === "highest") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list.reverse();
  }, [product.reviews, reviewSort]);

  const lineTotal = product.price * quantity;
  const mrpTotal = product.oldPrice * quantity;
  const youSave =
    product.oldPrice > product.price ? mrpTotal - lineTotal : 0;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
          {product.title}
        </h1>
        <button
          type="button"
          onClick={onShare}
          className="shrink-0 p-2 rounded-full text-neutral-500 hover:bg-neutral-100 transition-colors"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <StarRow rating={product.ratingAvg} />
        <span className="text-neutral-600">
          ({product.reviewCount} Reviews)
        </span>
        <span
          className={
            product.inStock
              ? "text-green-600 font-medium"
              : "text-red-500 font-medium"
          }
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
        {product.onSale && (
          <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
            Sale
          </span>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold text-neutral-900">
          ₹{lineTotal.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          ₹{product.price.toFixed(2)} each × {quantity}{" "}
          {quantity === 1 ? "item" : "items"}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-neutral-500">
          {product.oldPrice > product.price && (
            <>
              <span className="line-through">
                MRP ₹{mrpTotal.toFixed(2)}
              </span>
              {youSave > 0 && (
                <span className="text-green-600 font-medium">
                  You save ₹{youSave.toFixed(2)}
                </span>
              )}
            </>
          )}
          <span>(incl. of all taxes)</span>
        </div>
      </div>

      <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-neutral-900 text-sm">
            Coupons &amp; Offers
          </span>
          <button
            type="button"
            onClick={() => setCouponsExpanded((e) => !e)}
            className="text-sm font-medium text-[#C8F04C] hover:underline"
          >
            {couponsExpanded ? "See less" : "See All"}
          </button>
        </div>
        <ul className="space-y-2 text-sm text-neutral-700">
          {(couponsExpanded ? product.coupons : product.coupons.slice(0, 2)).map(
            (c) => (
              <li key={c.id} className="flex gap-2">
                <span className="text-[#C8F04C] font-bold shrink-0">•</span>
                {c.text}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white">
          <button
            type="button"
            className="p-2 rounded-l-full hover:bg-neutral-50"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            className="p-2 rounded-r-full hover:bg-neutral-50"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setWishlist((w) => !w)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            wishlist
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
          }`}
          aria-pressed={wishlist}
        >
          <Heart
            className={`w-4 h-4 ${wishlist ? "fill-current" : ""}`}
          />
          Wishlist
        </button>
      </div>

      <div className="border-t border-neutral-100 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-neutral-900">
              {product.ratingAvg.toFixed(1)}
            </span>
            <StarRow rating={product.ratingAvg} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium hover:bg-neutral-50"
            >
              Write a review
            </button>
            <select
              value={reviewSort}
              onChange={(e) =>
                setReviewSort(e.target.value as "highest" | "newest")
              }
              className="rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-3 text-sm font-medium"
            >
              <option value="highest">Highest Ratings</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <ul className="space-y-6">
          {sortedReviews.map((r: ProductReview) => (
            <li
              key={r.id}
              className="flex gap-4 pb-6 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white"
                aria-hidden
              >
                {r.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-neutral-900">
                    {r.author}
                  </span>
                  {r.verified && (
                    <span className="text-xs rounded-full bg-green-100 text-green-800 px-2 py-0.5">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <StarRow rating={r.rating} size="sm" />
                </div>
                <p className="mt-2 text-neutral-700 text-sm">{r.comment}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-neutral-500">
                  <span>{r.ago}</span>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      className="p-1 hover:text-neutral-800"
                      aria-label="Helpful"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:text-neutral-800"
                      aria-label="Not helpful"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
