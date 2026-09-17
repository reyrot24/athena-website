import { cn } from "@/lib/utils";
import type { SanityImg } from "@/sanity/types";
import { SanityImage } from "./sanity-image";

type PosterFrameProps = {
  image: SanityImg;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/**
 * Le locandine hanno testo fino ai bordi: le mostriamo intere (object-contain)
 * sopra una versione sfocata di sé stesse, così il riquadro resta pieno.
 */
export function PosterFrame({ image, alt, sizes, className, preload }: PosterFrameProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-ink", className)}>
      {image.lqip && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 scale-125 bg-cover bg-center opacity-80 blur-2xl"
          style={{ backgroundImage: `url(${image.lqip})` }}
        />
      )}
      <SanityImage
        image={image}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-contain transition-transform duration-700 ease-snappy"
      />
    </div>
  );
}
