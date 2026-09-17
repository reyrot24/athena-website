import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { NewsExplorer } from "@/components/news/news-explorer";
import { getNewsList } from "@/sanity/data";

export const metadata: Metadata = {
  title: "News",
  description: "Eventi, gare, campus e comunicazioni ufficiali di SSD CAM Athena a Montescaglioso.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const news = await getNewsList();

  return (
    <PageTransition>
      <PageHero
        eyebrow="News"
        title={
          <>
            Novità da <span className="txt-gradient">Athena</span>
          </>
        }
        description="Eventi, gare, campus e comunicazioni ufficiali della palestra."
        background={{ src: "/Athena_Palestra_3.jpg" }}
      />
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <NewsExplorer news={news} />
        </div>
      </section>
    </PageTransition>
  );
}
