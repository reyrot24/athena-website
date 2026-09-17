"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import type { SanityImg } from "@/sanity/types";

// Le trasformazioni (dimensione, formato AVIF/WebP) le fa la CDN di Sanity:
// niente doppia ottimizzazione e nessun costo di Image Optimization su Vercel.
const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.href;
};

type SanityImageProps = Omit<
  ImageProps,
  "src" | "loader" | "width" | "height" | "placeholder" | "blurDataURL"
> & { image: SanityImg };

export function SanityImage({ image, fill, alt, ...props }: SanityImageProps) {
  return (
    <Image
      loader={sanityLoader}
      src={image.url}
      alt={alt}
      fill={fill}
      {...(fill ? {} : { width: image.width, height: image.height })}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip ?? undefined}
      {...props}
    />
  );
}
