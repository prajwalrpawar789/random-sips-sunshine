import recipeLemonade from "@/assets/recipe-lemonade.png";
import recipeMojito from "@/assets/recipe-mojito.png";
import recipeCooler from "@/assets/recipe-cooler.png";
import recipePannaCotta from "@/assets/recipe-pannacotta.png";
import { CtaButton } from "./CtaButton";

const recipes = [
  { img: recipeLemonade, name: "Fresh Coconut Water Lemonade" },
  { img: recipeMojito, name: "Coconut Water Mojito" },
  { img: recipeCooler, name: "Tender Coconut Cooler" },
  { img: recipePannaCotta, name: "Coconut Panna Cotta" },
];

export function Recipes() {
  return (
    <section id="recipes" className="scroll-mt-24 bg-gradient-to-b from-background via-brand-soft/40 to-background py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">Fresh Coconut Water Recipes</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div key={recipe.name} className="flex flex-col items-center">
              <img
                src={recipe.img}
                alt={recipe.name}
                loading="lazy"
                className="h-44 w-44 rounded-full object-cover shadow-card transition-transform duration-300 hover:scale-105"
              />
              <h3 className="mt-4 font-display text-sm text-foreground">{recipe.name}</h3>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <CtaButton href="#order">Get a Bottle</CtaButton>
        </div>
      </div>
    </section>
  );
}
