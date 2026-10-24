import { Droplets, IndianRupee, PackageCheck, PartyPopper, Snowflake, Truck, type LucideIcon } from "lucide-react";
import palmLeft from "@/assets/palm-left.png.asset.json";

const stats: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Droplets, title: "100% Natural", desc: "Nothing added, ever" },
  { icon: PackageCheck, title: "Sealed 250 ml Bottles", desc: "Hygienically packed" },
  { icon: IndianRupee, title: "₹100 per Bottle", desc: "Straightforward pricing" },
  { icon: Truck, title: "Home Delivery", desc: "Chilled at your doorstep" },
  { icon: Snowflake, title: "Always Chilled", desc: "Freshness guaranteed" },
  { icon: PartyPopper, title: "Bulk & Events", desc: "For offices, gyms and parties" },
];

export function WhyChoose() {
  return (
    <section className="bg-gradient-to-b from-background via-brand-soft/50 to-background py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center font-display text-3xl text-foreground md:text-4xl">
          Why Choose Random Sips
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-card px-6 py-8 text-center shadow-card"
            >
              <img
                src={palmLeft.url}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-10 w-32 rotate-[135deg] opacity-20"
              />
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary shadow-card">
                <stat.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-lg text-foreground">{stat.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
