import type { PortableTextBlock } from "@portabletext/react";
import type { DayKey } from "@/lib/schedule";

export type SanityImg = {
  url: string;
  lqip: string | null;
  width: number;
  height: number;
};

export type Trainer = {
  _id: string;
  nome: string;
  lavoro: string | null;
  descrizione: PortableTextBlock[] | null;
  foto: SanityImg;
};

export type CoursePoster = {
  _id: string;
  nome: string | null;
  image: SanityImg;
};

export type ScheduleDoc = {
  _id: string;
  corso: string;
} & Partial<Record<DayKey, (string | null)[] | null>>;

export type GalleryItem = {
  _id: string;
  nomeImg: string | null;
  image: SanityImg;
};

export type NewsCard = {
  _id: string;
  titolo: string;
  slug: string;
  data: string | null;
  descrizione: string | null;
  img: SanityImg | null;
  hasPdf: boolean;
  hasVideo: boolean;
};

export type NewsArticle = NewsCard & {
  videoUrl: string | null;
  pdfUrl: string | null;
  contenuto: PortableTextBlock[] | null;
};

export type Testimonial = {
  _id: string;
  valutazione: number | null;
  name: string | null;
  message: string;
  date: string;
};

export type StoryMilestone = {
  _id: string;
  titolo: string;
  data: string;
  descrizione: string | null;
};
