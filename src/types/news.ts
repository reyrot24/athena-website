import { PortableTextBlock } from "sanity";

export type newstypes = {
  titolo: string;
  img: string;
  slug: string;
  data: Date;
  descrizione?: string;
  contenuto: PortableTextBlock[];
};
