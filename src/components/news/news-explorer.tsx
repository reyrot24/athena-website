"use client";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, normalizeText } from "@/lib/utils";
import type { NewsCard as NewsCardData } from "@/sanity/types";
import { NewsCard } from "./news-card";

export function NewsExplorer({ news }: { news: NewsCardData[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  const years = useMemo(
    () => [...new Set(news.map((item) => item.data?.slice(0, 4)).filter(Boolean))] as string[],
    [news],
  );

  const results = useMemo(() => {
    const q = normalizeText(deferredQuery.trim());
    return news.filter(
      (item) =>
        (!year || item.data?.startsWith(year)) &&
        (!q || normalizeText(`${item.titolo} ${item.descrizione ?? ""}`).includes(q)),
    );
  }, [news, deferredQuery, year]);

  const filtering = Boolean(deferredQuery.trim() || year);
  const [featured, ...rest] = results;
  const reset = () => {
    setQuery("");
    setYear(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <span className="sr-only">Cerca tra le news</span>
          <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca eventi, campus, gare…"
            className="h-14 w-full rounded-full border bg-card pr-12 pl-13 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-foreground/5"
              aria-label="Cancella ricerca"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0" aria-label="Filtra per anno">
          {[null, ...years].map((value) => {
            const selected = year === value;
            return (
              <button
                key={value ?? "tutte"}
                type="button"
                onClick={() => setYear(value)}
                aria-pressed={selected}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                  selected
                    ? "border-transparent bg-foreground text-background"
                    : "hover:border-brand hover:text-brand-ink",
                )}
              >
                {value ?? "Tutte"}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {results.length === 1 ? "1 news" : `${results.length} news`}
        {filtering ? " trovate" : ""}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-4xl border bg-card p-12 text-center">
          <p className="heading-display text-4xl">Nessun risultato</p>
          <p className="mt-3 text-muted-foreground">Prova con un&apos;altra parola o rimuovi i filtri.</p>
          <Button variant="outline" className="mt-6" onClick={reset}>
            Mostra tutte le news
          </Button>
        </div>
      ) : (
        <motion.div layout className="mt-8">
          {!filtering && featured && (
            <NewsCard news={featured} variant="wide" className="mb-16 border-b pb-16" />
          )}
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {(filtering ? results : rest).map((item) => (
                <motion.li
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  <NewsCard news={item} className="w-full" />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
