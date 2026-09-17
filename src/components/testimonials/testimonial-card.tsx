import { Quote } from "lucide-react";
import { Stars } from "@/components/ui/stars";
import { cn, formatDate } from "@/lib/utils";
import type { Testimonial } from "@/sanity/types";

export function TestimonialCard({ review, className }: { review: Testimonial; className?: string }) {
  const name = review.name?.trim() || "Anonimo";
  const date = formatDate(review.date);

  return (
    <figure className={cn("flex flex-col rounded-[1.75rem] border bg-card p-7 sm:p-8", className)}>
      <div className="flex items-center justify-between">
        <Quote aria-hidden className="size-9 fill-brand/15 text-brand" />
        <Stars value={review.valutazione ?? 5} />
      </div>
      <blockquote className="mt-5 text-lg leading-relaxed">{review.message}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
        <span
          aria-hidden
          className="grid size-10 place-items-center rounded-full bg-brand font-display text-lg text-ink uppercase"
        >
          {name.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold">{name}</span>
          {date && <span className="text-sm text-muted-foreground">{date}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
