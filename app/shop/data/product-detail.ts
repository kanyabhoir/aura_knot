import {
  CATEGORY_LABELS,
  SHOP_PRODUCTS,
  type ShopCategory,
  type ShopProduct,
} from "./catalog";

export type ProductReview = {
  id: string;
  author: string;
  initials: string;
  verified: boolean;
  rating: number;
  comment: string;
  ago: string;
};

export type ProductCoupon = { id: string; text: string };

export type FullProductDetail = ShopProduct & {
  gallery: string[];
  ratingAvg: number;
  reviewCount: number;
  coupons: ProductCoupon[];
  description: string;
  shippingReturn: string;
  keyFeatures: string[];
  reviews: ProductReview[];
};

const CATEGORY_IMAGE_POOL: Record<ShopCategory, string[]> = {
  woolen: ["/images/imgae1.jpg", "/images/Crochet.jpg", "/images/guide.png"],
  quilling: ["/images/Quiling.jpg", "/images/imgae1.jpg", "/images/Crochet.jpg"],
  sketch: ["/images/Sketch.jpg", "/images/Quiling.jpg", "/images/imgae1.jpg"],
};

const DEFAULT_COUPONS: ProductCoupon[] = [
  { id: "c1", text: "10% OFF your first order — use code KANN10" },
  { id: "c2", text: "Free shipping on orders above ₹499" },
  { id: "c3", text: "Extra 5% off on prepaid orders" },
];

function buildGallery(product: ShopProduct): string[] {
  const pool = CATEGORY_IMAGE_POOL[product.category];
  const unique = [product.image, ...pool.filter((u) => u !== product.image)];
  return [unique[0], unique[1] ?? unique[0], unique[2] ?? unique[0]];
}

const RICH_COPY: Partial<
  Record<
    string,
    {
      description: string;
      shippingReturn: string;
      keyFeatures: string[];
      reviews: ProductReview[];
      ratingAvg: number;
      reviewCount: number;
    }
  >
> = {
  "1": {
    ratingAvg: 4.5,
    reviewCount: 150,
    description:
      "Treat your phone to cozy handmade charm with our Hand-Knit Bird Phone Case. Each piece is carefully crocheted with natural cotton yarn, then finished with an embroidered bird and floral motif. Soft inner lining helps protect against light bumps and scratches while keeping your device snug and stylish.",
    shippingReturn:
      "We ship PAN-India within 3–5 business days. Express delivery available in select metros. Returns accepted within 7 days for unopened items in original packaging. Custom or made-to-order pieces are final sale unless defective.",
    keyFeatures: [
      "100% hand-crocheted cotton yarn",
      "Reinforced edges for everyday use",
      "Microfiber inner lining",
      "Compatible with most standard phone sizes",
      "Each piece is unique — slight variations celebrate handmade craft",
    ],
    reviews: [
      {
        id: "r1",
        author: "Ananya M.",
        initials: "AM",
        verified: true,
        rating: 5,
        comment: "Excellent product! Feels premium and the bird detail is adorable.",
        ago: "1 week ago",
      },
      {
        id: "r2",
        author: "Rahul K.",
        initials: "RK",
        verified: true,
        rating: 4,
        comment: "Beautiful workmanship. Arrived well packed.",
        ago: "2 weeks ago",
      },
      {
        id: "r3",
        author: "Priya S.",
        initials: "PS",
        verified: false,
        rating: 5,
        comment: "So many compliments — worth every rupee.",
        ago: "3 weeks ago",
      },
    ],
  },
};

const GENERIC_REVIEWS: ProductReview[] = [
  {
    id: "g1",
    author: "Verified Buyer",
    initials: "VB",
    verified: true,
    rating: 5,
    comment: "Excellent product — exactly as pictured.",
    ago: "1 week ago",
  },
  {
    id: "g2",
    author: "Meera L.",
    initials: "ML",
    verified: true,
    rating: 4,
    comment: "Lovely handmade quality. Fast delivery.",
    ago: "2 weeks ago",
  },
  {
    id: "g3",
    author: "Arjun P.",
    initials: "AP",
    verified: true,
    rating: 5,
    comment: "Great gift idea. Packaging was beautiful.",
    ago: "1 month ago",
  },
];

function buildDefaultCopy(product: ShopProduct) {
  const label = CATEGORY_LABELS[product.category];
  return {
    description: `${product.title} is part of our ${label} collection at KANNYA.art. Every item is crafted by hand with care, slight variations in texture and finish are natural and make your piece one of a kind. Perfect for gifting or adding a personal touch to your space.`,
    shippingReturn:
      "Standard delivery 3–7 business days across India. You will receive tracking details by email. Returns: unused items in original packaging within 7 days of delivery. Damaged or incorrect items — contact us within 48 hours for a replacement or refund.",
    keyFeatures: [
      `Authentic ${label} craftsmanship`,
      "Handmade in small batches",
      "Quality-checked before dispatch",
      "Secure packaging for safe transit",
    ],
    reviews: GENERIC_REVIEWS,
    ratingAvg: 4.3 + (product.id.charCodeAt(0) % 3) * 0.1,
    reviewCount: 24 + (parseInt(product.id, 10) || 0) * 4,
  };
}

export function getFullProductDetail(id: string): FullProductDetail | null {
  const product = SHOP_PRODUCTS.find((p) => p.id === id);
  if (!product) return null;

  const rich = RICH_COPY[id];
  const defaults = buildDefaultCopy(product);
  const copy = rich
    ? {
        description: rich.description,
        shippingReturn: rich.shippingReturn,
        keyFeatures: rich.keyFeatures,
        reviews: rich.reviews,
        ratingAvg: rich.ratingAvg,
        reviewCount: rich.reviewCount,
      }
    : defaults;

  return {
    ...product,
    gallery: buildGallery(product),
    ratingAvg: copy.ratingAvg,
    reviewCount: copy.reviewCount,
    coupons: DEFAULT_COUPONS,
    description: copy.description,
    shippingReturn: copy.shippingReturn,
    keyFeatures: copy.keyFeatures,
    reviews: copy.reviews,
  };
}

export function getSimilarProducts(
  productId: string,
  limit = 6
): ShopProduct[] {
  const product = SHOP_PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];
  const sameCategory = SHOP_PRODUCTS.filter(
    (p) => p.id !== productId && p.category === product.category
  );
  const other = SHOP_PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== product.category
  );
  return [...sameCategory, ...other].slice(0, limit);
}
