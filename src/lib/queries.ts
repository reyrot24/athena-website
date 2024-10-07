import { client } from "@/client";
import { newstypes } from "@/types/news";
import { QueryParams } from "@sanity/client";

export const QueryChiSiamo =
  '*[_type == "chisiamo"] | order(id asc){nome, descrizione, lavoro, foto}';

export const QueryCorsiEOrari =
  '*[_type == "corsi"]{corso, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica}';

export const QueryGalleria =
  '*[_type == "galleria"] | order(nomeImg asc) {nomeImg, image}';

export const QueryNews =
  '*[_type == "news"] | order(data desc) {titolo, img, "slug": slug.current, data, descrizione ,contenuto}';

export const QueryIndividualArticol =
  '*[_type == "news" && slug.current == $slug][0]{titolo, img, "slug": slug.current, data, descrizione ,contenuto}';

export const QueryRelatedArticols =
  '*[_type == "news" && slug.current != $slug] | order(data desc){titolo, img, "slug": slug.current, data, descrizione ,contenuto}[0..3]';

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
