"use client";

import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { PosterFrame } from "@/components/ui/poster-frame";
import type { SanityImg } from "@/sanity/types";

export function ZoomablePoster({ image, alt }: { image: SanityImg; alt: string }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="group relative block w-full overflow-hidden rounded-3xl border"
        aria-label="Apri la locandina a schermo intero"
      >
        <PosterFrame
          image={image}
          alt={alt}
          sizes="(min-width: 1024px) 380px, 100vw"
          preload
          className="aspect-4/5 transition-transform duration-700 ease-snappy group-hover:scale-[1.02]"
        />
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-bold text-bone backdrop-blur transition group-hover:bg-brand group-hover:text-ink">
          <Maximize2 className="size-3.5" /> Ingrandisci
        </span>
      </button>
      <Lightbox items={[{ image, alt }]} index={index} onIndexChange={setIndex} />
    </>
  );
}
