import heroBottlesStory from "@/assets/hero-bottles-story.jpg.asset.json";
import palmRight from "@/assets/palm-right.png.asset.json";

export function Story() {
  return (
    <section id="story" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-background via-brand-soft/40 to-background py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-foreground md:text-4xl">Our Story</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Random Sips was born from a simple idea — great hydration shouldn&apos;t be complicated.
            We bring tender coconut water to you in sealed, ready-to-sip 250 ml bottles, so you can
            enjoy nature&apos;s coolest drink anywhere, anytime.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Every bottle is filled with fresh coconut water — no added sugar, no preservatives, no
            shortcuts. From morning workouts to afternoon slumps and weekend gatherings, Random Sips
            keeps you refreshed, one random sip at a time.
          </p>
        </div>
        <div className="relative">
          <img
            src={palmRight.url}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 -right-10 w-40 opacity-60"
          />
          <img
            src={heroBottles.url}
            alt="Random Sips bottles, freshly bottled and ready for delivery"
            loading="lazy"
            className="w-full rounded-[45%_55%_52%_48%/48%_45%_55%_52%] object-cover shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
