import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

const leftLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
];

const rightLinks = [
  { label: "Benefits", href: "#benefits" },
  { label: "Recipes", href: "#recipes" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left Links */}
        <nav className="hidden flex-1 items-center gap-8 text-sm font-bold text-foreground/80 md:flex">
          {leftLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Brand Center Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 transition-transform hover:scale-105 md:absolute md:left-1/2 md:-translate-x-1/2"
          aria-label="Random Sips home"
        >
          <img
            src={logo.url}
            alt="Random Sips logo"
            className="h-10 w-10 rounded-full shadow-card md:h-12 md:w-12"
          />
          <span className="font-display text-lg font-bold tracking-tight text-foreground md:hidden">
            Random Sips
          </span>
        </a>

        {/* Right Links & WhatsApp Order Button */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-8 text-sm font-bold text-foreground/80 md:flex">
            {rightLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#order"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-display text-xs font-bold text-primary-foreground shadow-fresh transition-all hover:bg-primary/95 hover:shadow-lg active:scale-95 md:px-5 md:py-2.5 md:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Order Now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
