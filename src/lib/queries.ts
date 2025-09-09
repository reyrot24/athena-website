import { client } from "@/client";
import { newstypes } from "@/types/news";
import { QueryParams } from "@sanity/client";

export const QueryChiSiamo =
  '*[_type == "chisiamo"] | order(id asc){nome, descrizione, lavoro, foto}';

export const QueryCorsiOrari =
  '*[_type == "corsi"] | order(corso asc){corso, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica}';

export const QueryCorsiImg =
  '*[_type == "corsiImg"] | order(_createdAt asc){nome, image}';

export const QueryGalleria =
  '*[_type == "galleria"] | order(nomeImg asc) {nomeImg, image}';

export const QueryNews =
  '*[_type == "news"] | order(data desc) {titolo, img, "slug": slug.current, data, descrizione ,contenuto}';

export const QueryTestimonianze =
  '*[_type == "testimonianze" && approved == false] | order(data desc) {valutazione, name, message}';

export const QueryIndividualArticol =
  '*[_type == "news" && slug.current == $slug][0]{titolo,  video, link, img, "pdf": pdf.asset._ref,"slug": slug.current, data, descrizione ,contenuto}';

export const QueryRelatedArticols =
  '*[_type == "news" && slug.current != $slug] | order(data desc){titolo, img, "slug": slug.current, data, descrizione ,contenuto}[0..1]';

export async function sanityFetch({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
}): Promise<[]> {
  return client.fetch(query, params, {
    next: {
      revalidate: revalidate, // for simple, time-based revalidation
    },
  });
}

export async function getArticol(
  query: string,
  slug: string
): Promise<newstypes> {
  return client.fetch(
    query,
    { slug },
    {
      next: {
        revalidate: 10,
      },
    }
  );
}

export async function getArticols(query: string, slug: string): Promise<[]> {
  return client.fetch(
    query,
    { slug },
    {
      next: {
        revalidate: 10,
      },
    }
  );
}
