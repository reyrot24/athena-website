import { PortableTextBlock } from "sanity";

export type newstypes = {
  titolo: string;
  img: string;
  pdf: string;
  slug: string;
  data: Date;
  descrizione?: string;
  contenuto: PortableTextBlock[];
};
