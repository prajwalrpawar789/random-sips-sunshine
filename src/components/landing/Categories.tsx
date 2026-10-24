import {
  Briefcase,
  Building2,
  CalendarHeart,
  Dumbbell,
  HeartPulse,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

const categories: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Dumbbell, title: "Fitness Enthusiasts", desc: "Gyms, Zumba & yoga studios, sports clubs" },
  { icon: HeartPulse, title: "Health Endorsers", desc: "Doctors, patients & senior care" },
  { icon: Briefcase, title: "Working Professionals", desc: "Office staff & field teams" },
  { icon: Building2, title: "Corporate Wellness", desc: "Employee hydration programs" },
  { icon: CalendarHeart, title: "Event Planners", desc: "Weddings, marathons & community events" },
  { icon: PartyPopper, title: "Party Hosts", desc: "House parties & celebrations" },
];

export function Categories() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center font-display text-3xl text-foreground md:text-4xl">Who We Serve</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex items-start gap-4 rounded-3xl border border-border/70 bg-card px-5 py-5 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <category.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base text-foreground">{category.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{category.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
