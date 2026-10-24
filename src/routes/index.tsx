import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Goodness } from "@/components/landing/Goodness";
import { Story } from "@/components/landing/Story";
import { Benefits } from "@/components/landing/Benefits";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { OrderSection } from "@/components/landing/OrderSection";
import { Categories } from "@/components/landing/Categories";
import { Recipes } from "@/components/landing/Recipes";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Random Sips — Fresh Coconut Water, Delivered Chilled" },
      {
        name: "description",
        content:
          "Random Sips brings you fresh, natural coconut water in sealed 250 ml bottles at ₹100. Nibu pani coming soon. Order chilled bottles to your doorstep.",
      },
      { property: "og:title", content: "Random Sips — Fresh Coconut Water, Delivered Chilled" },
      {
        property: "og:description",
        content:
          "Fresh, natural coconut water in sealed 250 ml bottles at ₹100. Nibu pani coming soon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Goodness />
        <Story />
        <Benefits />
        <WhyChoose />
        <OrderSection />
        <Categories />
        <Recipes />
      </main>
      <Footer />
    </div>
  );
}
