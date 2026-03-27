import CategoryCards from "./CategoryCards";
import FeatureBar from "./FeatureBar";
import FeaturedProducts from "./FeaturedProducts";
import HeroSlider from "./HeroSlider";
import Newsletter from "./Newsletter";
import SuggestionSection from "./SuggestionSection";

/** Marketing homepage for visitors who are not signed in. */
export default function PublicHome() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <FeatureBar />
      <CategoryCards />
      <FeaturedProducts />
      <SuggestionSection />
      <Newsletter />
    </main>
  );
}
