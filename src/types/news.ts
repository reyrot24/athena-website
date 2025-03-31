import { PortableTextBlock } from "@portabletext/react";

export type newstypes = {
  titolo: string;
  video: boolean;
  link?: string;
  img: string;
  pdf: string;
  slug: string;
  data: Date;
  descrizione?: string;
  contenuto: PortableTextBlock[];
};
