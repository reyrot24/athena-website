import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NewsCard } from "@/components/news/news-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getNewsList } from "@/sanity/data";

export async function NewsTeaser() {
  const news = (await getNewsList()).slice(0, 3);
  if (news.length === 0) return null;
  const [first, ...others] = news;

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="News"
            title={
              <>
                Ultime dalla <span className="txt-gradient">palestra</span>
              </>
            }
            description="Eventi, gare, campus e comunicazioni ufficiali."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/news">
              Tutte le news <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <Reveal>
            <NewsCard news={first} variant="featured" />
          </Reveal>
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
            {others.map((item, i) => (
              <Reveal key={item._id} delay={0.1 * (i + 1)}>
                <NewsCard news={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
