import { Facebook, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Benefits", href: "#benefits" },
  { label: "Order", href: "#order" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#order" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 text-center">
        <img src={logo.url} alt="Random Sips logo" className="h-16 w-16 rounded-full shadow-card" />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-foreground/80">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary shadow-card transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border/70 py-4 text-center text-xs text-muted-foreground">
        © 2026 Random Sips. All rights reserved.
      </div>
    </footer>
  );
}
