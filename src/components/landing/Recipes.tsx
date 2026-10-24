import recipeLemonade from "@/assets/recipe-lemonade.png";
import recipeMojito from "@/assets/recipe-mojito.png";
import recipeCooler from "@/assets/recipe-cooler.png";
import recipePannaCotta from "@/assets/recipe-pannacotta.png";

const recipes = [
  {
    img: recipeLemonade,
    name: "Coconut Water Lemonade",
    time: "2 mins",
    desc: "Zesty lemon squeeze over chilled fresh coconut water with mint leaves.",
  },
  {
    img: recipeMojito,
    name: "Tropical Coconut Mojito",
    time: "3 mins",
    desc: "Muddled lime, organic brown sugar, crushed ice, and fresh coconut fizz.",
  },
  {
    img: recipeCooler,
    name: "Tender Coconut Cooler",
    time: "2 mins",
    desc: "Blended coconut water with tender coconut malai pulp served extra cold.",
  },
  {
    img: recipePannaCotta,
    name: "Coconut Panna Cotta",
    time: "Dessert",
    desc: "A silky, tropical dairy-free dessert infused with natural coconut sweetness.",
  },
];

export function Recipes() {
  return (
    <section id="recipes" className="scroll-mt-24 bg-gradient-to-b from-background via-brand-soft/40 to-background py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          Mix & Sip
        </span>
        <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">
          Fresh Coconut Water Recipes
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Versatile natural goodness. Drink it pure, or shake up refreshing tropical treats at home.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.name}
              className="group flex flex-col items-center rounded-3xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-fresh"
            >
              <div className="relative">
                <img
                  src={recipe.img}
                  alt={recipe.name}
                  loading="lazy"
                  className="h-44 w-44 rounded-full object-cover shadow-card transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-1 right-2 rounded-full bg-card/90 px-3 py-0.5 text-[11px] font-bold text-primary shadow-sm backdrop-blur">
                  {recipe.time}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base text-foreground">
                {recipe.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {recipe.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="#order"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-fresh transition-all hover:bg-primary/95 hover:shadow-lg active:scale-95"
          >
            Get a Chilled Bottle Now (₹100)
          </a>
        </div>
      </div>
    </section>
  );
}
