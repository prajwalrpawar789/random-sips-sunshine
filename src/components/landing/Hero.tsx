import heroProduct from "@/assets/hero-bottle-product.png";
import palmLeft from "@/assets/palm-left.png.asset.json";
import palmRight from "@/assets/palm-right.png.asset.json";
import { CtaButton } from "./CtaButton";

function RotatingBadge() {
  return (
    <div className="relative hidden h-28 w-28 shrink-0 lg:block" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slower">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-muted-foreground" style={{ fontSize: 10.5, letterSpacing: 2.2, fontFamily: "Nunito Sans, sans-serif" }}>
          <textPath href="#badge-circle">RANDOM SIPS • FRESH • NATURAL •</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl text-primary">+</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 via-background to-background pt-28 pb-10">
      <img
        src={palmLeft.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-10 w-72 rotate-[160deg] opacity-90 md:w-96"
      />
      <img
        src={palmRight.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -right-14 w-64 opacity-90 md:top-10 md:w-80"
      />
      <img
        src={palmLeft.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 -left-16 hidden w-56 -rotate-[70deg] opacity-70 md:block"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-6">
          <RotatingBadge />
          <div>
            <h1 className="font-display text-4xl leading-tight text-foreground md:text-6xl">
              Sip the Freshness,
              <br />
              Taste the Tropics
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              At Random Sips, we&apos;re passionate about delivering nature&apos;s purest hydration —
              fresh coconut water, bottled and delivered to your doorstep.
            </p>
          </div>
          <div className="hidden h-28 w-28 shrink-0 lg:block" aria-hidden="true" />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <CtaButton href="#order">Order Now</CtaButton>
          <span className="rounded-full border border-primary/30 bg-card px-5 py-2.5 text-sm font-bold text-foreground shadow-card">
            250 ml bottle · ₹100
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-8 flex max-w-4xl justify-center px-4">
        <img
          src={heroProduct}
          alt="Random Sips 250 ml coconut water bottle"
          className="w-72 animate-float rounded-[3rem] drop-shadow-xl md:w-96"
        />
      </div>
    </section>
  );
}
