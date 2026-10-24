import { Facebook, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import palmLeft from "@/assets/palm-left.png.asset.json";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Benefits", href: "#benefits" },
  { label: "Recipes", href: "#recipes" },
  { label: "Order Now", href: "#order" },
];

const socials = [
  { icon: MessageCircle, label: "WhatsApp", href: "#order" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-secondary/40 via-secondary/70 to-secondary/90">
      {/* Background Palm accent */}
      <img
        src={palmLeft.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 w-56 rotate-[120deg] opacity-15"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 px-4 pt-16 pb-12 text-center">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo.url}
            alt="Random Sips logo"
            className="h-16 w-16 rounded-full shadow-card transition-transform hover:scale-105"
          />
          <h3 className="font-display text-xl text-foreground">Random Sips</h3>
          <p className="max-w-md text-xs text-muted-foreground">
            Pure, natural coconut water in sealed 250 ml bottles delivered frosty cold to your doorstep.
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-foreground/85">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary shadow-card transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span>Terms & Conditions</span>
          <span>•</span>
          <span>Privacy Policy</span>
          <span>•</span>
          <span>FSSAI Compliant Packaging</span>
        </div>
      </div>

      <div className="border-t border-border/70 py-4 text-center text-xs text-muted-foreground">
        © 2026 Random Sips. All rights reserved. Made with nature&apos;s finest hydration.
      </div>
    </footer>
  );
}
