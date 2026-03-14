"use client";

import CategoryCards from "./components/home/CategoryCards";
import FeatureBar from "./components/home/FeatureBar";
import FeaturedProducts from "./components/home/FeaturedProducts";
import HeroSlider from "./components/home/HeroSlider";
import Newsletter from "./components/home/Newsletter";
import SuggestionSection from "./components/home/SuggestionSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <FeatureBar />
      <CategoryCards />
      <FeaturedProducts />
      <SuggestionSection />
      <Newsletter />
    </main>
  );
}
