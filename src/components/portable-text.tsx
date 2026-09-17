import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { cn } from "@/lib/utils";
import type { SanityImg } from "@/sanity/types";
import { SanityImage } from "./ui/sanity-image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5 leading-relaxed first:mt-0">{children}</p>,
    h1: ({ children }) => <h2 className="heading-display mt-12 mb-4 text-5xl">{children}</h2>,
    h2: ({ children }) => <h2 className="heading-display mt-12 mb-4 text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="heading-display mt-10 mb-3 text-3xl">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-8 mb-2 text-xl font-bold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-brand pl-5 text-xl italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 space-y-2.5">{children}</ul>,
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2.5 pl-6 marker:font-bold marker:text-brand-ink">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3">
        <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-brand" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-brand-ink underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: Partial<SanityImg> & { alt?: string } }) =>
      value?.url && value.width && value.height ? (
        <figure className="my-8 overflow-hidden rounded-3xl border">
          <SanityImage
            image={value as SanityImg}
            alt={value.alt ?? ""}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="h-auto w-full"
          />
        </figure>
      ) : null,
  },
};

export function RichText({ value, className }: { value: PortableTextBlock[]; className?: string }) {
  return (
    <div className={cn("text-lg text-foreground/85", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
