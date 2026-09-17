import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-brand-ink uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Heading className="heading-display mt-4 text-5xl sm:text-6xl lg:text-7xl">{title}</Heading>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground sm:text-xl">{description}</p>
      )}
    </div>
  );
}
