import { Metadata } from "next";
import AboutUs from "./AboutUs";

export const metadata: Metadata = {
  title: "About Us | KANNYA.art",
  description:
    "Learn about KANNYA.art — handmade wool crafts, quilling art, and sketches from artisans who care about every detail.",
};

export default function AboutPage() {
  return <AboutUs />;
}
