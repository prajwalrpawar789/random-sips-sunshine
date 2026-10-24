import {
  Briefcase,
  Building,
  Dumbbell,
  HeartPulse,
  PartyPopper,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface CategoryItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  tags: string[];
}

const categories: CategoryItem[] = [
  {
    icon: Dumbbell,
    title: "Fitness Enthusiasts",
    subtitle: "Pure natural electrolyte hydration for post-sweat muscle recovery.",
    tags: ["Gyms", "Zumba & Yoga Studios", "CrossFit", "Sports Clubs"],
  },
  {
    icon: HeartPulse,
    title: "Health Endorsing",
    subtitle: "Recommended by nutritionists and doctors for potassium & kidney wellness.",
    tags: ["Doctors", "Patients", "Senior Care", "Recovery Wellness"],
  },
  {
    icon: Sparkles,
    title: "Vitality Users",
    subtitle: "The crisp, zero-guilt morning sip to replace packaged energy drinks.",
    tags: ["Daily Consumers", "Morning Runners", "Active Families"],
  },
  {
    icon: Briefcase,
    title: "Corporate Wellness",
    subtitle: "Elevate team productivity and hydration during long work days.",
    tags: ["Tech Offices", "Field Teams", "Co-Working Spaces", "Executive Lounges"],
  },
  {
    icon: Building,
    title: "Government & Institutions",
    subtitle: "Trusted, hygienic bottled hydration for formal gatherings and academies.",
    tags: ["Officer Clubs", "Institutions", "Sports Academies", "NCC & Defense"],
  },
  {
    icon: PartyPopper,
    title: "Event Collaboration",
    subtitle: "Chilled aesthetic coconut bottle counters that delight every guest.",
    tags: ["Weddings", "Marathons", "House Parties", "Corporate Summits"],
  },
];

export function Categories() {
  return (
    <section className="bg-gradient-to-b from-background via-brand-soft/30 to-background py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Target Audiences
          </span>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">
            Who We Serve
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            From elite athletes and corporate breakrooms to intimate celebrations, Random Sips is tailored for every moment.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-fresh"
            >
              <div>
                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-105">
                    <category.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-foreground">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {category.subtitle}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
