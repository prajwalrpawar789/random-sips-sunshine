import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function CtaButton({ href, children, className, onClick }: CtaButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-display text-sm uppercase tracking-widest text-primary-foreground shadow-fresh transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90",
        className,
      )}
    >
      {children}
    </a>
  );
}
