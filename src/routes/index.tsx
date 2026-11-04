import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Random Sips — Sip the Sweetness, Taste the Tropics" },
      {
        name: "description",
        content:
          "A little tropical goodness, every day. Discover fresh coconut water from Random Sips, our story, natural benefits, and refreshing coconut recipes.",
      },
      { property: "og:title", content: "Random Sips — Fresh. Natural. Refreshing." },
      {
        property: "og:description",
        content:
          "Sip the sweetness. Taste the tropics. Fresh coconut water and everyday tropical goodness from Random Sips.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});
