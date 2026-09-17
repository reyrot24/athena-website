"use client";

import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SanityImage } from "@/components/ui/sanity-image";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/sanity/types";

// Griglia 4×3 su desktop (2 colonne su mobile) che si riempie senza buchi con 6 foto.
const layout = [
  "col-span-2 sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "sm:col-span-2",
  "col-span-2",
];

export function GalleryMosaic({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const photos = items.slice(0, layout.length);

  return (
    <>
      <ul className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:grid-cols-4 sm:gap-4">
        {photos.map((item, i) => (
          <Reveal as="li" key={item._id} delay={i * 0.06} className={cn("relative", layout[i])}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group absolute inset-0 overflow-hidden rounded-3xl bg-muted"
              aria-label={`Apri ${item.nomeImg ?? "la foto"} a schermo intero`}
            >
              <SanityImage
                image={item.image}
                alt={item.nomeImg ?? "Foto della palestra"}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-snappy group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Maximize2 className="absolute top-4 right-4 size-5 text-bone opacity-0 transition duration-500 group-hover:opacity-100" />
            </button>
          </Reveal>
        ))}
      </ul>
      <Lightbox
        items={photos.map((item) => ({
          image: item.image,
          alt: item.nomeImg ?? "Foto della palestra",
          caption: item.nomeImg,
        }))}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
