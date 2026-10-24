import logo from "@/assets/logo.png.asset.json";
import { CtaButton } from "./CtaButton";

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
        <nav className="hidden items-center gap-7 text-sm font-semibold text-foreground/80 md:flex">
          {leftLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#home" className="absolute left-1/2 -translate-x-1/2" aria-label="Random Sips home">
          <img src={logo.url} alt="Random Sips logo" className="h-12 w-12 rounded-full shadow-card" />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-foreground/80 md:flex">
          {rightLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <CtaButton href="#order" className="px-5 py-2.5 text-xs">
          Order Now
        </CtaButton>
      </div>
    </header>
  );
}
