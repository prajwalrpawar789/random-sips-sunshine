import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Droplets, Leaf, Recycle, Snowflake } from "lucide-react";
import featureVersatile from "@/assets/feature-versatile.png.asset.json";

const benefits = [
  {
    id: "item-1",
    icon: Droplets,
    title: "Nutritional Excellence",
    short: "Nature's electrolyte drink, straight from the tender green nut.",
    bullets: [
      "Naturally rich in potassium, magnesium, and essential electrolytes to instantly rehydrate.",
      "Light, low-calorie refreshment with zero artificial sugars or chemical preservatives.",
      "A pure daily boost of vitamins and bioactive enzymes in every sip.",
    ],
  },
  {
    id: "item-2",
    icon: Leaf,
    title: "Versatility in Every Sip",
    short: "Enjoy it chilled, blended, or shaken into mocktails.",
    bullets: [
      "Drink chilled right out of the bottle for quick post-workout recovery.",
      "Blend with tropical fruits, matcha, or berries for an energizing morning smoothie.",
      "The perfect crisp mixer for mocktails, coolers, and natural spritzers.",
    ],
  },
  {
    id: "item-3",
    icon: Recycle,
    title: "Sustainably Sourced",
    short: "Direct partnerships with coastal coconut farming communities.",
    bullets: [
      "Tender green coconuts harvested responsibly at peak ripeness.",
      "Fair-trade sourcing that supports local farming families.",
      "Recyclable, food-grade PET bottles designed to keep carbon footprint low.",
    ],
  },
  {
    id: "item-4",
    icon: Snowflake,
    title: "Freshness Guaranteed",
    short: "Cold-bottled and sealed on harvest day — never from concentrate.",
    bullets: [
      "Hygienically extracted and hermetically sealed in our 250 ml bottles.",
      "Delivered in cold-chain boxes straight to your doorstep so it arrives frosty cold.",
      "100% raw taste — no added sugar, no dilution, no compromise.",
    ],
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 py-20 bg-gradient-to-b from-background via-brand-soft/30 to-background">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            100% Pure & Untouched
          </span>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Benefits of Our Fresh Coconuts
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Discover why fresh tender coconut water is revered as nature&apos;s finest hydrator.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          {/* Left: Product Visual */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand/10 blur-2xl transform scale-90" />
              <img
                src={featureVersatile.url}
                alt="Fresh tender coconut water pouring into a glass"
                loading="lazy"
                className="relative w-72 animate-float-slow drop-shadow-2xl md:w-88"
              />
            </div>
          </div>

          {/* Right: Interactive Accordion */}
          <div>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-3">
              {benefits.map((benefit) => (
                <AccordionItem
                  key={benefit.id}
                  value={benefit.id}
                  className="rounded-2xl border border-border/80 bg-card px-5 shadow-card transition-all data-[state=open]:border-primary/40 data-[state=open]:ring-1 data-[state=open]:ring-primary/20"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <benefit.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base text-foreground md:text-lg">
                          {benefit.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {benefit.short}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4">
                    <ul className="space-y-2 border-t border-border/40 pt-3 pl-2 text-sm text-muted-foreground">
                      {benefit.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
