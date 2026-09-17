"use client";

import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SanityImage } from "@/components/ui/sanity-image";
import { cn } from "@/lib/utils";

type ImageMasonryProps = {
  items: (LightboxItem & { id: string })[];
  /** Mostra la didascalia sotto ogni immagine (locandine) invece che al passaggio del mouse. */
  captions?: "below" | "hover";
  className?: string;
};

/** Colonne "a mattoncino" che rispettano le proporzioni originali, con lightbox. */
export function ImageMasonry({ items, captions = "hover", className }: ImageMasonryProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className={cn("columns-1 gap-5 sm:columns-2 lg:columns-3", className)}>
        {items.map((item, i) => (
          <Reveal as="li" key={item.id} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full text-left"
              aria-label={`Apri ${item.caption ?? "l'immagine"} a schermo intero`}
            >
              <span className="relative block overflow-hidden rounded-3xl border bg-muted">
                <SanityImage
                  image={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-snappy group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Maximize2 className="absolute top-4 right-4 size-5 text-bone opacity-0 transition duration-500 group-hover:opacity-100" />
                {captions === "hover" && item.caption && (
                  <span className="absolute bottom-4 left-4 translate-y-2 font-semibold text-bone opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                )}
              </span>
              {captions === "below" && item.caption && (
                <span className="mt-3 block font-display text-2xl uppercase transition-colors group-hover:text-brand-ink">
                  {item.caption}
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </ul>
      <Lightbox items={items} index={index} onIndexChange={setIndex} />
    </>
  );
}
