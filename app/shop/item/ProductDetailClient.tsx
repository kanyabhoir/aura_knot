"use client";

import Newsletter from "@/app/components/home/Newsletter";
import type { ProductCardProps } from "@/app/components/home/ProductCard";
import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import type { FullProductDetail } from "@/app/shop/data/product-detail";
import { useCart } from "@/lib/cart/CartContext";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery";
import ProductDetailTabs from "./components/ProductDetailTabs";
import ProductInfoCard from "./components/ProductInfoCard";
import SimilarProductsSection from "./components/SimilarProductsSection";

type ProductDetailClientProps = {
  product: FullProductDetail;
  similarCards: ProductCardProps[];
};

export default function ProductDetailClient({
  product,
  similarCards,
}: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on KANNYA.art`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not share");
    }
  }, [product.title]);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) {
      toast.error("This item is out of stock");
      return;
    }
    addItem({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      onSale: product.onSale,
      qty: quantity,
    });
    toast.success(`Added ${quantity} × ${product.title} to cart`);
  }, [
    addItem,
    product.id,
    product.image,
    product.inStock,
    product.oldPrice,
    product.onSale,
    product.price,
    product.title,
    quantity,
  ]);

  const handleBuyNow = useCallback(() => {
    if (!product.inStock) {
      toast.error("This item is out of stock");
      return;
    }
    addItem({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      onSale: product.onSale,
      qty: quantity,
    });
    toast.success("Added to cart — opening checkout");
    router.push("/cart");
  }, [
    addItem,
    product.id,
    product.image,
    product.inStock,
    product.oldPrice,
    product.onSale,
    product.price,
    product.title,
    quantity,
    router,
  ]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" toastOptions={{ duration: 2800 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <ImageGallery
            images={product.gallery}
            title={product.title}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            disabled={!product.inStock}
          />
          <ProductInfoCard
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onShare={share}
          />
        </div>

        <ProductDetailTabs
          description={product.description}
          shippingReturn={product.shippingReturn}
          keyFeatures={product.keyFeatures}
        />

        <SimilarProductsSection products={similarCards} />
      </div>

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
