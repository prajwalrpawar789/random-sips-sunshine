import { Droplets, Leaf, Recycle, Snowflake } from "lucide-react";
import featureVersatile from "@/assets/feature-versatile.png.asset.json";

const benefits = [
  {
    icon: Droplets,
    title: "Nutritional Excellence",
    body: "Nature's electrolyte drink, straight from the nut.",
    bullets: [
      "Naturally rich in potassium and essential electrolytes",
      "Light, low-calorie refreshment for any time of day",
      "A natural boost of vitamins and minerals in every sip",
    ],
  },
  {
    icon: Leaf,
    title: "Versatility in Every Sip",
    body: "Sip it chilled, blend it into smoothies, or mix up coolers and mocktails.",
  },
  {
    icon: Recycle,
    title: "Sustainably Sourced",
    body: "We work closely with local farmers to bring you tender coconuts at their freshest.",
  },
  {
    icon: Snowflake,
    title: "Freshness Guaranteed",
    body: "Bottled the same day and delivered chilled — never from concentrate.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center font-display text-3xl text-foreground md:text-4xl">
          Benefits of Our Fresh Coconuts
        </h2>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <div className="relative flex justify-center">
            <img
              src={featureVersatile.url}
              alt="Fresh coconut water pouring into a glass"
              loading="lazy"
              className="w-72 animate-float-slow md:w-80"
            />
          </div>
          <ul className="space-y-6">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary shadow-card">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-foreground">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.body}</p>
                  {benefit.bullets && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {benefit.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
