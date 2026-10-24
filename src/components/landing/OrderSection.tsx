import { useState } from "react";
import { CheckCircle2, MessageCircle, Minus, Plus, Sparkles, Bell } from "lucide-react";
import nibuPani from "@/assets/nibupani-teaser.png";
import heroBottle from "@/assets/hero-bottle-product.png";

// You can fill this with your WhatsApp Business phone number (e.g., "919876543210")
export const ORDER_WHATSAPP = "";

const included = [
  "100% Raw & Natural, never from concentrate",
  "Zero added sugar, zero chemical preservatives",
  "Sealed 250 ml hygienic food-grade bottle",
  "Delivered chilled right to your doorstep",
];

const PACKS = [
  { label: "Single Bottle", qty: 1, tag: "Quick Sip" },
  { label: "Trio Pack", qty: 3, tag: "Workout Trio" },
  { label: "6-Pack Box", qty: 6, tag: "Most Popular", popular: true },
  { label: "12-Pack Crate", qty: 12, tag: "Family & Events" },
];

export function OrderSection() {
  const [quantity, setQuantity] = useState(6);
  const pricePerBottle = 100;
  const totalPrice = quantity * pricePerBottle;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // WhatsApp order link
  const orderMessage = `Hi Random Sips! I would like to order ${quantity} bottle${quantity > 1 ? "s" : ""} (250ml) of Fresh Coconut Water for ₹${totalPrice}. Please share delivery details!`;
  
  const whatsappHref = ORDER_WHATSAPP
    ? `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(orderMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(orderMessage)}`;

  // WhatsApp notify link for Nibu Pani
  const notifyMessage = `Hi Random Sips! Please notify me when your new Nibu Pani bottle launches!`;
  const notifyHref = ORDER_WHATSAPP
    ? `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(notifyMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(notifyMessage)}`;

  return (
    <section id="order" className="scroll-mt-24 bg-gradient-to-b from-brand-soft/70 via-background to-brand-soft/50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Instant Doorstep Delivery
          </span>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">
            Order Your Fresh Sips
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Natural chilled coconut water bottled on order. Pick your quantity and order directly on WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-12">
          {/* Main Product Order Card */}
          <div className="relative flex flex-col justify-between rounded-4xl border border-border/80 bg-card p-6 shadow-card md:p-10 lg:col-span-7">
            <div className="absolute -top-3 right-8 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-fresh">
              Fresh Batch Ready
            </div>

            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl text-foreground md:text-3xl">
                    Fresh Coconut Water
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sealed 250 ml bottle · Harvested today
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl text-primary md:text-5xl">₹100</span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">/ bottle</span>
                </div>
              </div>

              {/* Quick Pack Selection */}
              <div className="mt-8">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Pack Size
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {PACKS.map((pack) => (
                    <button
                      key={pack.qty}
                      type="button"
                      onClick={() => setQuantity(pack.qty)}
                      className={`relative flex flex-col items-center rounded-2xl border p-3 text-center transition-all ${
                        quantity === pack.qty
                          ? "border-primary bg-secondary/80 font-bold text-foreground shadow-sm ring-1 ring-primary"
                          : "border-border/80 bg-background/60 text-muted-foreground hover:border-primary/50 hover:bg-secondary/40"
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground">
                          POPULAR
                        </span>
                      )}
                      <span className="font-display text-lg text-foreground">{pack.qty} {pack.qty === 1 ? "Bottle" : "Bottles"}</span>
                      <span className="mt-0.5 text-xs font-medium text-primary">₹{pack.qty * pricePerBottle}</span>
                      <span className="mt-1 text-[10px] text-muted-foreground">{pack.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary/50 p-4">
                <span className="text-sm font-semibold text-foreground">
                  Custom Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    aria-label="Decrease quantity"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition hover:bg-secondary hover:text-primary active:scale-95"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-display text-xl text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    aria-label="Increase quantity"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition hover:bg-secondary hover:text-primary active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total Bill</p>
                  <p className="font-display text-2xl text-primary">₹{totalPrice}</p>
                </div>
              </div>

              {/* Inclusions */}
              <ul className="mt-6 space-y-2.5 text-xs text-foreground/85 md:text-sm">
                {included.map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 border-t border-border/70 pt-6">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-base font-semibold text-primary-foreground shadow-fresh transition-all duration-300 hover:bg-primary/95 hover:shadow-lg active:scale-[0.99]"
              >
                <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Order {quantity} {quantity === 1 ? "Bottle" : "Bottles"} on WhatsApp (₹{totalPrice})</span>
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                ✦ No advance payment needed · Cash / UPI on Doorstep Delivery
              </p>
            </div>
          </div>

          {/* Nibu Pani Teaser Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-4xl border border-border/80 bg-card p-6 text-center shadow-card md:p-10 lg:col-span-5">
            {/* Top coming soon pill */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500/90 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
                Coming Soon
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <div className="relative mt-2">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl" />
                <img
                  src={nibuPani}
                  alt="Random Sips Nibu Pani fresh lemon water bottle"
                  loading="lazy"
                  className="relative h-64 w-64 rounded-3xl object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105 md:h-72 md:w-72"
                />
              </div>

              <h3 className="mt-6 font-display text-2xl text-foreground md:text-3xl">
                Nibu Pani Cooler
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-amber-600">
                Indian Lemon Water & Shikanji
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our authentic desi lemon water cooler infused with Himalayan rock salt, roasted cumin, and natural mint. Refreshment that hits home.
              </p>
            </div>

            <div className="mt-8 border-t border-border/70 pt-6">
              <a
                href={notifyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 font-display text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-card active:scale-[0.99]"
              >
                <Bell className="h-4 w-4" />
                <span>Notify Me on WhatsApp When Ready</span>
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                First 100 subscribers get a free trial bottle!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
