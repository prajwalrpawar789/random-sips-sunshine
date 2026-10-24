import featureWellness from "@/assets/feature-wellness.png.asset.json";
import featureVersatile from "@/assets/feature-versatile.png.asset.json";
import logo from "@/assets/logo.png.asset.json";

const items = [
  {
    img: featureWellness.url,
    alt: "Fresh green coconuts",
    title: "Nutritional Powerhouse",
    desc: "Nature's own electrolyte drink, straight from the nut.",
  },
  {
    img: featureVersatile.url,
    alt: "Coconut water being poured into a glass",
    title: "Versatility in Usage",
    desc: "Sip it chilled, blend it, or mix up coolers and mocktails.",
  },
  {
    img: logo.url,
    alt: "Random Sips logo",
    title: "Health and Wellness Benefits",
    desc: "Light, natural refreshment for every day of the week.",
  },
];

export function Goodness() {
  return (
    <section className="pb-20 pt-6">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">Nothing but Goodness</h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Fresh coconut water, consistently...</p>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <img src={item.img} alt={item.alt} loading="lazy" className="h-36 w-36 rounded-full object-cover shadow-card" />
              <h3 className="mt-5 font-display text-lg text-foreground">{item.title}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
