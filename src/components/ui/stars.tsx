import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <div
      className={cn("flex gap-0.5 text-brand", className)}
      role="img"
      aria-label={`${value.toFixed(1).replace(".0", "")} su 5 stelle`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn("size-4", i < rounded ? "fill-current" : "opacity-30")}
        />
      ))}
    </div>
  );
}
