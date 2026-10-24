import { CheckCircle2 } from "lucide-react";
import nibuPani from "@/assets/nibupani-teaser.png";
import { CtaButton } from "./CtaButton";

// Set this to your WhatsApp number in international format (e.g. "919812345678")
// to turn the Order button into a live WhatsApp chat link.
export const ORDER_WHATSAPP = "";

const included = [
  "Bottled fresh, never from concentrate",
  "No added sugar or preservatives",
  "Delivered chilled to your doorstep",
];

export function OrderSection() {
  const whatsappHref = ORDER_WHATSAPP ? `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent("Hi Random Sips! I'd like to order coconut water bottles.")}` : "";

  return (
    <section id="order" className="scroll-mt-24 bg-brand-soft/70 py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="rounded-4xl bg-card p-8 shadow-card md:p-10">
          <h2 className="font-display text-3xl text-foreground">Fresh Coconut Water</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sealed 250 ml bottle, ready to sip.</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-5xl text-primary">₹100</span>
            <span className="text-sm font-semibold text-muted-foreground">per 250 ml bottle</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-foreground/80">
            {included.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {whatsappHref ? (
              <CtaButton href={whatsappHref}>Order on WhatsApp</CtaButton>
            ) : (
              <div>
                <CtaButton href="#order" className="cursor-pointer opacity-90">
                  Order Now
                </CtaButton>
                <p className="mt-3 text-xs text-muted-foreground">
                  Message us on WhatsApp or Instagram to place your order — contact details coming soon.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative text-center">
          <span className="absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-5 py-1.5 font-display text-xs uppercase tracking-widest text-primary-foreground shadow-fresh">
            Coming Soon
          </span>
          <img
            src={nibuPani}
            alt="Random Sips Nibu Pani lemon water bottle, coming soon"
            loading="lazy"
            className="w-72 rounded-4xl object-cover shadow-card md:w-96"
          />
          <h3 className="mt-5 font-display text-2xl text-foreground md:text-3xl">Nibu Pani</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our zesty lemon water cooler is on its way — stay thirsty!
          </p>
        </div>
      </div>
    </section>
  );
}
