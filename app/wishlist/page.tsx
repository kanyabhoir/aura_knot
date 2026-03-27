import type { Metadata } from "next";
import WishlistPageClient from "./WishlistPageClient";

export const metadata: Metadata = {
  title: "Wishlist | KANNYA.art",
  description: "Your saved handmade favourites — wool crafts, quilling art, and sketches.",
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
