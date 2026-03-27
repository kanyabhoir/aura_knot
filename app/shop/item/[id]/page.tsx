import type { ProductCardProps } from "@/app/components/home/ProductCard";
import type { ShopProduct } from "@/app/shop/data/catalog";
import {
  getFullProductDetail,
  getSimilarProducts,
} from "@/app/shop/data/product-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "../ProductDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getFullProductDetail(id);
  if (!product) return { title: "Product" };
  return {
    title: `${product.title} | KANNYA.art`,
    description: product.description.slice(0, 160),
  };
}

function toCardProps(p: ShopProduct): ProductCardProps {
  return {
    id: p.id,
    image: p.image,
    title: p.title,
    oldPrice: p.oldPrice,
    price: p.price,
    onSale: p.onSale,
    slug: `/shop/item/${p.id}`,
  };
}

export default async function ShopItemPage({ params }: PageProps) {
  const { id } = await params;
  const product = getFullProductDetail(id);
  if (!product) notFound();

  const similar = getSimilarProducts(id, 8).map(toCardProps);

  return (
    <ProductDetailClient product={product} similarCards={similar} />
  );
}
