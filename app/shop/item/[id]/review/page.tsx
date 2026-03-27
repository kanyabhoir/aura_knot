import { getFullProductDetail } from "@/app/shop/data/product-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WriteReviewClient from "./WriteReviewClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getFullProductDetail(id);
  if (!product) return { title: "Write a review | KANNYA.art" };
  return {
    title: `Write a review: ${product.title} | KANNYA.art`,
    description: `Share feedback for ${product.title} on KANNYA.art`,
  };
}

export default async function WriteReviewPage({ params }: PageProps) {
  const { id } = await params;
  const product = getFullProductDetail(id);
  if (!product) notFound();

  const minimal = {
    id: product.id,
    title: product.title,
    image: product.image,
    ratingAvg: product.ratingAvg,
  };

  return <WriteReviewClient product={minimal} />;
}
