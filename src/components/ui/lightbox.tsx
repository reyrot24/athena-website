"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Dialog } from "radix-ui";
import { useCallback, useState } from "react";
import type { SanityImg } from "@/sanity/types";
import { SanityImage } from "./sanity-image";

export type LightboxItem = { image: SanityImg; alt: string; caption?: string | null };

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

const slide: Variants = {
  enter: (direction: number) => ({ x: direction >= 0 ? "12%" : "-12%", opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? "-12%" : "12%", opacity: 0, scale: 0.96 }),
};

export function Lightbox({ items, index, onIndexChange }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const count = items.length;
  const item = index === null ? null : items[index];

  const go = useCallback(
    (delta: number) => {
      if (index === null || count < 2) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  return (
    <Dialog.Root open={index !== null} onOpenChange={(open) => !open && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-80 bg-ink/95 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(1);
            if (event.key === "ArrowLeft") go(-1);
          }}
          className="fixed inset-0 z-80 flex flex-col text-bone outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
            <Dialog.Title className="min-w-0 truncate text-sm text-bone/75">
              <span className="font-semibold text-bone tabular-nums">
                {(index ?? 0) + 1} / {count}
              </span>
              {item?.caption ? <span className="ml-3">{item.caption}</span> : null}
            </Dialog.Title>
            <Dialog.Close
              className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              aria-label="Chiudi"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {item && (
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  drag={count > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80 || info.velocity.x < -500) go(1);
                    else if (info.offset.x > 80 || info.velocity.x > 500) go(-1);
                  }}
                  className="absolute inset-0 px-3 pb-6 sm:px-20 sm:pb-10"
                >
                  <div className="relative size-full">
                    <SanityImage
                      image={item.image}
                      alt={item.alt}
                      fill
                      sizes="100vw"
                      draggable={false}
                      className="pointer-events-none object-contain select-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Precarica le foto accanto: sfogliando compaiono subito. */}
            {index !== null && count > 1 && (
              <div aria-hidden className="relative hidden">
                {[1, -1].map((delta) => {
                  const neighbour = items[(index + delta + count) % count];
                  return (
                    <SanityImage
                      key={delta}
                      image={neighbour.image}
                      alt=""
                      fill
                      sizes="100vw"
                      loading="eager"
                    />
                  );
                })}
              </div>
            )}

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-brand hover:text-ink sm:grid"
                  aria-label="Immagine precedente"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-brand hover:text-ink sm:grid"
                  aria-label="Immagine successiva"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
