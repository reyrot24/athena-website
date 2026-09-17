"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { RichText } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/reveal";
import { SanityImage } from "@/components/ui/sanity-image";
import type { Trainer } from "@/sanity/types";

export function TrainerGrid({ trainers }: { trainers: Trainer[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const trainer = index === null ? null : trainers[index];

  const go = (delta: number) =>
    setIndex((current) => (current === null ? current : (current + delta + trainers.length) % trainers.length));

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {trainers.map((item, i) => (
          <Reveal as="li" key={item._id} delay={(i % 4) * 0.07}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              className="group block w-full text-left"
            >
              <span className="relative block aspect-square overflow-hidden rounded-3xl border bg-ink">
                <SanityImage
                  image={item.foto}
                  alt={item.lavoro ? `${item.nome}, ${item.lavoro}` : item.nome}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-snappy group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Scopri di più <ArrowUpRight className="size-3.5" />
                </span>
              </span>
              {item.lavoro && (
                <span className="mt-4 block text-xs font-bold tracking-[0.2em] text-brand-ink uppercase">
                  {item.lavoro}
                </span>
              )}
              <span className="heading-display mt-1 block text-2xl sm:text-3xl">{item.nome}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Dialog open={trainer !== null} onOpenChange={(open) => !open && setIndex(null)}>
        {trainer && (
          <DialogContent aria-describedby={undefined} className="sm:max-w-4xl sm:overflow-hidden sm:p-0">
            <div className="grid sm:grid-cols-2">
              <div className="relative -mx-6 -mt-6 aspect-square bg-ink sm:m-0 sm:aspect-auto sm:min-h-[30rem]">
                <SanityImage
                  image={trainer.foto}
                  alt={trainer.nome}
                  fill
                  sizes="(min-width: 640px) 450px, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col pt-6 sm:p-10">
                {trainer.lavoro && (
                  <p className="text-xs font-bold tracking-[0.2em] text-brand-ink uppercase">{trainer.lavoro}</p>
                )}
                <DialogTitle className="mt-2 pr-10 text-5xl">{trainer.nome}</DialogTitle>
                {trainer.descrizione?.length ? (
                  <RichText value={trainer.descrizione} className="mt-5 text-base" />
                ) : null}
                {trainers.length > 1 && (
                  <div className="mt-auto flex items-center gap-2 pt-8">
                    <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Trainer precedente">
                      <ArrowLeft />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Trainer successivo">
                      <ArrowRight />
                    </Button>
                    <span className="ml-2 text-sm text-muted-foreground tabular-nums">
                      {(index ?? 0) + 1} / {trainers.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
