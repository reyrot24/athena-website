import { ArrowLeft, Download, ExternalLink, FileText, Play } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons";
import { PageTransition } from "@/components/layout/page-transition";
import { NewsCard } from "@/components/news/news-card";
import { ShareButton } from "@/components/news/share-button";
import { ZoomablePoster } from "@/components/news/zoomable-poster";
import { RichText } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatsappLink } from "@/lib/site";
import { formatDate, riseDelay } from "@/lib/utils";
import { getArticle, getNewsSlugs, getRelatedNews } from "@/sanity/data";

type ArticlePageProps = { params: Promise<{ newsId: string }> };

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  // Con Cache Components serve almeno un parametro: le news pubblicate dopo il
  // deploy vengono comunque renderizzate alla prima visita.
  return slugs.length ? slugs.map((newsId) => ({ newsId })) : [{ newsId: "benvenuti" }];
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { newsId } = await params;
  const article = await getArticle(decodeURIComponent(newsId));
  if (!article) return { title: "News non trovata" };

  const image = article.img
    ? { url: `${article.img.url}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630, alt: article.titolo }
    : { url: "/og", width: 1200, height: 630, alt: article.titolo };

  return {
    title: article.titolo,
    description: article.descrizione ?? undefined,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.titolo,
      description: article.descrizione ?? undefined,
      publishedTime: article.data ?? undefined,
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { newsId } = await params;
  const article = await getArticle(decodeURIComponent(newsId));
  if (!article) notFound();

  const related = await getRelatedNews(article.slug);
  const date = formatDate(article.data);

  return (
    <PageTransition>
      <article>
        <header className="grain relative isolate overflow-hidden bg-ink pt-32 pb-14 text-bone sm:pt-40 sm:pb-20">
          {article.img?.lqip && (
            <div
              aria-hidden
              className="absolute inset-0 -z-20 scale-125 bg-cover bg-center opacity-50 blur-3xl"
              style={{ backgroundImage: `url(${article.img.lqip})` }}
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_11_12/0.4)_0%,rgb(11_11_12/0.8)_70%,#0b0b0c_100%)]"
          />
          <div className="container-page">
            <Link
              href="/news"
              className="hero-rise inline-flex items-center gap-2 text-sm font-semibold text-bone/70 transition hover:text-brand"
              style={riseDelay(0)}
            >
              <ArrowLeft className="size-4" /> Tutte le news
            </Link>
            <div className="hero-rise mt-8 flex flex-wrap items-center gap-2 text-sm" style={riseDelay(0.05)}>
              {date && (
                <time dateTime={article.data ?? undefined} className="rounded-full bg-white/10 px-3 py-1 font-semibold">
                  {date}
                </time>
              )}
              {article.videoUrl && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 font-bold text-ink">
                  <Play className="size-3.5 fill-current" /> Video
                </span>
              )}
              {article.pdfUrl && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold">
                  <FileText className="size-3.5" /> PDF allegato
                </span>
              )}
            </div>
            <h1
              className="hero-rise heading-display mt-5 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)]"
              style={riseDelay(0.1)}
            >
              {article.titolo}
            </h1>
            {article.descrizione && (
              <p className="hero-rise mt-6 max-w-3xl text-lg whitespace-pre-line text-bone/75 sm:text-xl" style={riseDelay(0.16)}>
                {article.descrizione}
              </p>
            )}
          </div>
        </header>

        <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:py-20">
          <div className="min-w-0 max-w-3xl">
            {article.videoUrl && (
              <video
                controls
                preload="metadata"
                playsInline
                poster={article.img ? `${article.img.url}?w=1280&auto=format` : undefined}
                className="mb-10 aspect-video w-full rounded-3xl border bg-ink"
              >
                <source src={article.videoUrl} />
                Il tuo browser non supporta la riproduzione video.
              </video>
            )}

            {article.contenuto?.length ? (
              <RichText value={article.contenuto} />
            ) : !article.pdfUrl && !article.videoUrl ? (
              <p className="text-lg text-muted-foreground">Tutti i dettagli sono nella locandina.</p>
            ) : null}

            {article.pdfUrl && (
              <div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] border bg-card p-6 sm:flex-row sm:items-center">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand text-ink">
                  <FileText className="size-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Documento allegato</p>
                  <p className="truncate text-sm text-muted-foreground">PDF · {article.titolo}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline">
                    <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                      Apri <ExternalLink />
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={`${article.pdfUrl}?dl=${encodeURIComponent(`${article.slug}.pdf`)}`}>
                      Scarica <Download />
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {article.img && <ZoomablePoster image={article.img} alt={`Locandina: ${article.titolo}`} />}
            <ShareButton title={article.titolo} />
            <Button asChild variant="whatsapp" className="w-full">
              <a
                href={whatsappLink(`Ciao Athena! Vorrei informazioni su "${article.titolo}".`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Chiedi informazioni
              </a>
            </Button>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="border-t bg-muted/40 py-20 sm:py-28">
            <div className="container-page">
              <SectionHeading
                eyebrow="Continua a leggere"
                title={
                  <>
                    Altre <span className="txt-gradient">news</span>
                  </>
                }
              />
              <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </PageTransition>
  );
}
