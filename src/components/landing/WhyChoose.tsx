import {
  CalendarDays,
  Clock,
  Droplets,
  HeartHandshake,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import palmLeft from "@/assets/palm-left.png.asset.json";

interface FeatureBadge {
  icon: LucideIcon;
  stat: string;
  label: string;
  desc: string;
}

const features: FeatureBadge[] = [
  {
    icon: CalendarDays,
    stat: "200+",
    label: "Weddings & Events",
    desc: "Catered fresh for parties, corporate summits, and sports marathons.",
  },
  {
    icon: Users,
    stat: "1,000+",
    label: "Happy Customers",
    desc: "Daily fitness enthusiasts, families, and wellness endorsers.",
  },
  {
    icon: Droplets,
    stat: "100%",
    label: "Natural & Raw",
    desc: "Never from concentrate. Zero added sugars, water, or chemicals.",
  },
  {
    icon: Clock,
    stat: "24 Hrs",
    label: "Guaranteed Delivery",
    desc: "Chilled express doorstep dispatch to lock in natural freshness.",
  },
  {
    icon: ShieldCheck,
    stat: "3+ Years",
    label: "Trusted Experience",
    desc: "Sourcing premium coconuts straight from verified coastal orchards.",
  },
  {
    icon: HeartHandshake,
    stat: "20+",
    label: "Dedicated Team",
    desc: "Passionate harvesters, quality checkers, and delivery champs.",
  },
];

function LeafWreathBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15 transition-opacity duration-300 group-hover:opacity-35" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-48 w-48 text-primary">
        <g fill="currentColor">
          {/* Decorative radiating palm leaves */}
          <ellipse cx="100" cy="30" rx="8" ry="24" transform="rotate(0 100 30)" />
          <ellipse cx="150" cy="50" rx="8" ry="24" transform="rotate(45 150 50)" />
          <ellipse cx="170" cy="100" rx="8" ry="24" transform="rotate(90 170 100)" />
          <ellipse cx="150" cy="150" rx="8" ry="24" transform="rotate(135 150 150)" />
          <ellipse cx="100" cy="170" rx="8" ry="24" transform="rotate(180 100 170)" />
          <ellipse cx="50" cy="150" rx="8" ry="24" transform="rotate(225 50 150)" />
          <ellipse cx="30" cy="100" rx="8" ry="24" transform="rotate(270 30 100)" />
          <ellipse cx="50" cy="50" rx="8" ry="24" transform="rotate(315 50 50)" />
        </g>
      </svg>
    </div>
  );
}

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-brand-soft/40 to-background py-24">
      {/* Subtle corner foliage */}
      <img
        src={palmLeft.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 w-48 rotate-45 opacity-20"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Our Promise
          </span>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">
            Why Choose Random Sips
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            From the grove to your sip — hygiene, transparency, and uncompromised quality every step of the way.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-border/80 bg-card p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-fresh"
            >
              <LeafWreathBackground />

              {/* Icon badge */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-8 w-8" />
              </div>

              {/* Stat number */}
              <div className="relative z-10 mt-5 font-display text-3xl text-foreground">
                {feature.stat}
              </div>

              {/* Stat title */}
              <h3 className="relative z-10 mt-1 font-display text-base text-foreground/90">
                {feature.label}
              </h3>

              {/* Stat desc */}
              <p className="relative z-10 mt-2 text-xs leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
