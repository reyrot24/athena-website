import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  /** Secondi per un giro completo. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

/** Nastro infinito in solo CSS: il contenuto è duplicato e traslato del 50%. */
export function Marquee({ children, duration = 40, reverse, pauseOnHover, className }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
