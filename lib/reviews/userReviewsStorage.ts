import type { ProductReview } from "@/app/shop/data/product-detail";

export type UserSubmittedReview = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  imageDataUrl?: string;
  createdAt: string;
};

const STORAGE_KEY = "kannya-user-reviews-v1";
/** Keep storage small — skip image if base64 is huge */
const MAX_IMAGE_CHARS = 280_000;

type StoreShape = Record<string, UserSubmittedReview[]>;

function readStore(): StoreShape {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoreShape;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: StoreShape) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota or private mode */
  }
}

function formatAgo(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "Recently";
  const diff = Date.now() - t;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} min ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} hours ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} days ago`;
  return new Date(iso).toLocaleDateString();
}

export function getProductUserReviews(productId: string): UserSubmittedReview[] {
  const store = readStore();
  const list = store[productId];
  return Array.isArray(list) ? [...list].reverse() : [];
}

export function appendProductUserReview(
  productId: string,
  payload: {
    rating: number;
    comment: string;
    imageDataUrl?: string;
  }
): UserSubmittedReview {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `ur-${Date.now()}`;
  let imageDataUrl = payload.imageDataUrl;
  if (imageDataUrl && imageDataUrl.length > MAX_IMAGE_CHARS) {
    imageDataUrl = undefined;
  }
  const review: UserSubmittedReview = {
    id,
    productId,
    rating: payload.rating,
    comment: payload.comment.trim(),
    imageDataUrl,
    createdAt: new Date().toISOString(),
  };
  const store = readStore();
  const prev = Array.isArray(store[productId]) ? store[productId] : [];
  store[productId] = [...prev, review];
  writeStore(store);
  return review;
}

export function userReviewToProductReview(
  u: UserSubmittedReview
): ProductReview {
  return {
    id: `user-${u.id}`,
    author: "You",
    initials: "YO",
    verified: false,
    rating: u.rating,
    comment: u.comment,
    ago: formatAgo(u.createdAt),
    imageUrl: u.imageDataUrl,
  };
}
