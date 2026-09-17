import { defineQuery } from "next-sanity";

/** Proiezione immagine: URL della CDN, placeholder sfocato e dimensioni reali. */
const IMAGE = /* groq */ `{
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const NEWS_CARD = /* groq */ `
  _id,
  titolo,
  "slug": slug.current,
  data,
  descrizione,
  "img": select(defined(img.asset) => img${IMAGE}),
  "hasPdf": defined(pdf.asset),
  "hasVideo": (defined(link) && link != "") || defined(video.asset)
`;

export const TRAINERS_QUERY = defineQuery(`
  *[_type == "chisiamo" && defined(foto.asset)] | order(id asc) {
    _id,
    nome,
    lavoro,
    descrizione,
    "foto": foto${IMAGE}
  }
`);

export const COURSE_POSTERS_QUERY = defineQuery(`
  *[_type == "corsiImg" && defined(image.asset)] | order(_createdAt asc) {
    _id,
    nome,
    "image": image${IMAGE}
  }
`);

export const SCHEDULE_QUERY = defineQuery(`
  *[_type == "corsi" && defined(corso)] | order(corso asc) {
    _id, corso, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica
  }
`);

export const GALLERY_QUERY = defineQuery(`
  *[_type == "galleria" && defined(image.asset)] | order(nomeImg asc) {
    _id,
    nomeImg,
    "image": image${IMAGE}
  }
`);

export const NEWS_LIST_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] | order(data desc, _createdAt desc) {
    ${NEWS_CARD}
  }
`);

export const NEWS_SLUGS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)].slug.current
`);

// `video` in alcuni documenti è un booleano (+ `link` a Vercel Blob), in altri
// un file caricato su Sanity: `videoUrl` normalizza entrambi i casi.
export const NEWS_ARTICLE_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    ${NEWS_CARD},
    "videoUrl": select(
      defined(link) && link != "" => link,
      video.asset->url
    ),
    "pdfUrl": pdf.asset->url,
    contenuto[] {
      ...,
      _type == "image" => ${IMAGE}
    }
  }
`);

export const RELATED_NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current) && slug.current != $slug] | order(data desc)[0...3] {
    ${NEWS_CARD}
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonianze" && approved == true && defined(message)] | order(coalesce(date, _createdAt) desc) {
    _id,
    valutazione,
    name,
    message,
    "date": coalesce(date, _createdAt)
  }
`);

export const STORY_QUERY = defineQuery(`
  *[_type == "lanostrastoria" && defined(titolo) && defined(data)] | order(data asc) {
    _id,
    titolo,
    data,
    descrizione
  }
`);
