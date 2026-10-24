import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Goodness } from "@/components/landing/Goodness";
import { Story } from "@/components/landing/Story";
import { Benefits } from "@/components/landing/Benefits";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { OrderSection } from "@/components/landing/OrderSection";
import { AppBanner } from "@/components/landing/AppBanner";
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
          "Random Sips brings you fresh, natural tender coconut water in sealed 250 ml bottles at ₹100. Nibu pani cooler coming soon. Delivered frosty cold to your doorstep.",
      },
      { property: "og:title", content: "Random Sips — Fresh Coconut Water, Delivered Chilled" },
      {
        property: "og:description",
        content:
          "Fresh, natural coconut water in sealed 250 ml bottles at ₹100. Nibu pani coming soon. Order chilled on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Nav />
      <main>
        <Hero />
        <Goodness />
        <Story />
        <Benefits />
        <WhyChoose />
        <OrderSection />
        <AppBanner />
        <Categories />
        <Recipes />
      </main>
      <Footer />
    </div>
  );
}
