import palmLeft from "@/assets/palm-left.png.asset.json";
import palmRight from "@/assets/palm-right.png.asset.json";

function GooglePlayBadge() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-foreground/15 bg-card/90 px-4 py-2.5 text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card cursor-default">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.609 1.814L13.792 12 3.61 22.186a2.227 2.227 0 0 1-.22-.962V2.776c0-.363.08-.696.22-.962z" fill="#4285F4" />
        <path d="M17.155 8.636l-3.363 3.364 3.363 3.364 3.79-2.17a1.64 1.64 0 0 0 0-2.842l-3.79-2.17z" fill="#FBBC04" />
        <path d="M3.609 1.814l10.183 10.186 3.363-3.364L5.614.733c-.702-.4-1.528-.216-2.005.38z" fill="#EA4335" />
        <path d="M13.792 12L3.61 22.186c.477.597 1.303.78 2.005.38l11.541-6.903-3.364-3.663z" fill="#34A853" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">GET IT ON</p>
        <p className="font-display text-xs font-bold leading-none text-foreground">Google Play</p>
      </div>
    </div>
  );
}

function AppStoreBadge() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-foreground/15 bg-card/90 px-4 py-2.5 text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card cursor-default">
      <svg className="h-6 w-6 fill-current text-foreground" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.8c.61-.75 1.04-1.8 1.01-2.8-.9.04-2 .6-2.64 1.35-.57.65-1.06 1.7-1 2.7.99.08 2.02-.5 2.63-1.25" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Download on the</p>
        <p className="font-display text-xs font-bold leading-none text-foreground">App Store</p>
      </div>
    </div>
  );
}

export function AppBanner() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-r from-secondary/80 via-brand-soft to-secondary/80 p-8 shadow-card md:p-12">
          {/* Decorative background palm branches */}
          <img
            src={palmLeft.url}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-12 w-48 rotate-45 opacity-25 md:w-64"
          />
          <img
            src={palmRight.url}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -right-8 w-44 -rotate-12 opacity-25 md:w-56"
          />

          {/* Tropical Sun Element */}
          <div className="pointer-events-none absolute top-4 right-12 h-16 w-16 rounded-full bg-amber-300/30 blur-xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Stay Connected
            </span>

            <h2 className="mt-3 font-display text-2xl text-foreground md:text-4xl">
              Application is coming soon
            </h2>

            <p className="mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
              Order your favorite bottles in a single tap, track live chilled delivery to your door, and set up daily morning hydration subscriptions.
            </p>

            {/* App badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <GooglePlayBadge />
              <AppStoreBadge />
            </div>

            <p className="mt-4 text-xs font-medium text-primary">
              ✦ Coming Soon to iOS & Android
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
