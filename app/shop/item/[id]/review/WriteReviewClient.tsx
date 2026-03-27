"use client";

import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import type { FullProductDetail } from "@/app/shop/data/product-detail";
import { appendProductUserReview } from "@/lib/reviews/userReviewsStorage";
import {
  ArrowRight,
  Camera,
  Check,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

function ratingLabel(n: number): string {
  if (n >= 5) return "Excellent";
  if (n >= 4) return "Very Good";
  if (n >= 3) return "Good";
  if (n >= 2) return "Fair";
  if (n >= 1) return "Poor";
  return "Tap to rate";
}

type Props = {
  product: Pick<FullProductDetail, "id" | "title" | "image" | "ratingAvg">;
};

export default function WriteReviewClient({ product }: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [redirectSec, setRedirectSec] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayStars = hoverRating || rating;

  const onFile = useCallback((fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError("Image must be 5MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r === "string") {
        setImagePreview(r);
        setImageFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const clearImage = () => {
    setImagePreview(null);
    setImageFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    setError(null);
    if (rating < 1) {
      setError("Please choose a star rating.");
      return;
    }
    const text = comment.trim();
    if (text.length < 3) {
      setError("Please write a few words in your review.");
      return;
    }
    appendProductUserReview(product.id, {
      rating,
      comment: text,
      imageDataUrl: imagePreview ?? undefined,
    });
    setRedirectSec(3);
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;
    let seconds = 3;
    const id = window.setInterval(() => {
      seconds -= 1;
      setRedirectSec(seconds);
      if (seconds <= 0) {
        window.clearInterval(id);
        router.push(`/shop/item/${product.id}#reviews`);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [submitted, router, product.id]);

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-neutral-100 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 shadow-sm ring-1 ring-black/[0.04] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#66BB6A] text-white">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h1 className="mt-6 text-xl font-bold text-neutral-900 sm:text-2xl">
            Your review for this product has been successfully submitted!
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            You will be automatically redirected in {redirectSec}s
          </p>
          <Link
            href={`/shop/item/${product.id}#reviews`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Back to product
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.title, href: `/shop/item/${product.id}` },
            { label: "Write a review" },
          ]}
        />

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.06] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href={`/shop/item/${product.id}`}
              className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:mx-0"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="text-lg font-bold text-neutral-900 sm:text-xl">
                {product.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <div
                  className="flex gap-0.5"
                  role="group"
                  aria-label="Your rating"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F04C] focus-visible:ring-offset-2"
                      onMouseEnter={() => setHoverRating(n)}
                      onClick={() => setRating(n)}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`h-7 w-7 sm:h-8 sm:w-8 ${
                          displayStars >= n
                            ? "fill-neutral-900 text-neutral-900"
                            : "fill-neutral-200 text-neutral-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-medium text-[#66BB6A]">
                  {ratingLabel(displayStars)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="review-text" className="sr-only">
              Review description
            </label>
            <textarea
              id="review-text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add review in description"
              rows={8}
              className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#C8F04C] focus:outline-none focus:ring-2 focus:ring-[#C8F04C]/35"
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-neutral-700">
              Add product image{" "}
              <span className="font-normal text-neutral-500">
                (optional, max 5MB)
              </span>
            </p>
            <div className="flex flex-wrap items-start gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-center text-xs text-neutral-500 transition-colors hover:border-[#C8F04C] hover:bg-[#C8F04C]/10"
              >
                <Camera className="h-8 w-8 text-neutral-400" />
                <span>Add photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files)}
              />
              {imagePreview && (
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt={imageFileName ?? "Upload preview"}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href={`/shop/item/${product.id}#reviews`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8F04C] px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#d4f25f] sm:min-w-[140px]"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Go back
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:min-w-[200px]"
            >
              Submit your feedback
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
