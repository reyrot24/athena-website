import { ArrowUpRight, FileText, Play } from "lucide-react";
import Link from "next/link";
import { PosterFrame } from "@/components/ui/poster-frame";
import { cn, formatDate } from "@/lib/utils";
import type { NewsCard as NewsCardData } from "@/sanity/types";

type NewsCardProps = {
  news: NewsCardData;
  /** `featured`: più grande in colonna; `wide`: orizzontale da lg (news in evidenza). */
  variant?: "default" | "featured" | "wide";
  className?: string;
};

const sizes = {
  default: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  featured: "(min-width: 1024px) 55vw, 100vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
};

export function NewsCard({ news, variant = "default", className }: NewsCardProps) {
  const date = formatDate(news.data, "short");
  const large = variant !== "default";

  return (
    <article
      className={cn(
        "group relative",
        variant === "wide" ? "grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14" : "flex flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border bg-ink",
          variant === "featured" ? "aspect-4/3 lg:aspect-16/11" : "aspect-4/3",
        )}
      >
        {news.img ? (
          <PosterFrame
            image={news.img}
            alt=""
            sizes={sizes[variant]}
            className="size-full transition-transform duration-700 ease-snappy group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grain relative grid size-full place-items-center bg-[radial-gradient(60%_80%_at_80%_0%,rgb(246_161_76/0.3),transparent_70%)] text-bone">
            <div className="text-center">
              <FileText className="mx-auto size-12 text-brand" />
              <p className="mt-3 text-xs font-bold tracking-[0.28em] uppercase opacity-70">Documento</p>
            </div>
          </div>
        )}
        {(news.hasVideo || news.hasPdf) && (
          <div className="absolute top-4 left-4 flex gap-2">
            {news.hasVideo && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-bone backdrop-blur">
                <Play className="size-3.5 fill-current" /> Video
              </span>
            )}
            {news.hasPdf && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-bone backdrop-blur">
                <FileText className="size-3.5" /> PDF
              </span>
            )}
          </div>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col", variant !== "wide" && "mt-5")}>
        {variant === "wide" && (
          <p className="mb-4 w-fit rounded-full bg-brand px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-ink uppercase">
            In evidenza
          </p>
        )}
        {date && (
          <time
            dateTime={news.data ?? undefined}
            className="text-xs font-bold tracking-[0.2em] text-brand-ink uppercase"
          >
            {date}
          </time>
        )}
        <h3
          className={cn(
            "heading-display mt-2 transition-colors group-hover:text-brand-ink",
            large ? "text-4xl sm:text-5xl" : "text-3xl",
            variant === "wide" && "lg:text-6xl",
          )}
        >
          <Link href={`/news/${news.slug}`} className="after:absolute after:inset-0">
            {news.titolo}
          </Link>
        </h3>
        {news.descrizione && (
          <p className={cn("mt-3 text-muted-foreground", large ? "line-clamp-3 text-lg" : "line-clamp-2")}>
            {news.descrizione}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
          Leggi
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
