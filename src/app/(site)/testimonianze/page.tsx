import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { ReviewDialog } from "@/components/testimonials/review-dialog";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { Reveal } from "@/components/ui/reveal";
import { Stars } from "@/components/ui/stars";
import { riseDelay } from "@/lib/utils";
import { getTestimonials } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Testimonianze",
  description: "Le recensioni di chi si allena da SSD CAM Athena a Montescaglioso. Racconta anche la tua esperienza!",
  alternates: { canonical: "/testimonianze" },
};

export default async function TestimonianzePage() {
  const reviews = await getTestimonials();
  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + (review.valutazione ?? 5), 0) / reviews.length
    : null;

  return (
    <PageTransition>
      <PageHero
        eyebrow="Testimonianze"
        title={
          <>
            Dicono di <span className="txt-gradient">noi</span>
          </>
        }
        description="Le esperienze di chi si allena con noi. Raccontaci anche la tua: ci aiuta a crescere."
        background={{ src: "/Athena_Palestra_4.jpg" }}
      >
        <div className="hero-rise mt-10 flex flex-wrap items-center gap-4" style={riseDelay(0.24)}>
          {average !== null && (
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur-md">
              <span className="font-display text-5xl leading-none">{average.toFixed(1).replace(".", ",")}</span>
              <div>
                <Stars value={average} />
                <p className="mt-1 text-sm text-bone/70">
                  {reviews.length === 1 ? "1 recensione" : `${reviews.length} recensioni`}
                </p>
              </div>
            </div>
          )}
          <ReviewDialog />
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="container-page">
          {reviews.length > 0 ? (
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {reviews.map((review, i) => (
                <Reveal as="li" key={review._id} delay={(i % 3) * 0.08} className="mb-6 break-inside-avoid">
                  <TestimonialCard review={review} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="rounded-4xl border bg-card p-12 text-center">
              <p className="heading-display text-4xl">Ancora nessuna recensione</p>
              <p className="mt-3 text-muted-foreground">Sii il primo a raccontare la tua esperienza!</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
