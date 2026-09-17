import { cacheLife } from "next/cache";
import type { QueryParams } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});

/**
 * Unico confine `'use cache'` per i contenuti Sanity.
 *
 * `<SanityLive />` invalida la cache all'istante quando un contenuto cambia,
 * ma solo se in quel momento c'è almeno un visitatore sul sito. Il cacheLife
 * breve qui sotto (chiamato dopo `sanityFetch`, che imposterebbe un anno) è la
 * rete di sicurezza: una modifica fatta "a sito vuoto" compare entro pochi minuti.
 */
export async function fetchSanity<T>(query: string, params: QueryParams = {}): Promise<T> {
  "use cache";
  const { data } = await sanityFetch({ query, params, stega: false });
  cacheLife({ stale: 300, revalidate: 300, expire: 60 * 60 * 24 * 30 });
  return data as T;
}
