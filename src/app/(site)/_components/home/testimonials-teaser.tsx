import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReviewDialog } from "@/components/testimonials/review-dialog";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTestimonials } from "@/sanity/data";

export async function TestimonialsTeaser() {
  const reviews = await getTestimonials();
  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + (review.valutazione ?? 5), 0) / reviews.length
    : null;

  return (
    <section className="overflow-hidden border-y bg-muted/40 py-24 sm:py-32">
      <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Testimonianze"
          title={
            <>
              Dicono di <span className="txt-gradient">noi</span>
            </>
          }
          description={
            average
              ? `Valutazione media ${average.toFixed(1).replace(".", ",")} su 5 da chi si allena con noi.`
              : "Ti alleni con noi? Raccontaci la tua esperienza."
          }
        />
        <Button asChild variant="outline" className="w-fit">
          <Link href="/testimonianze">
            Tutte le recensioni <ArrowRight />
          </Link>
        </Button>
      </div>

      {reviews.length >= 4 ? (
        <Marquee duration={70} pauseOnHover className="fade-x mt-14 [&>div>div]:items-stretch">
          {reviews.map((review) => (
            <TestimonialCard key={review._id} review={review} className="mr-5 w-[21rem] shrink-0 sm:w-[26rem]" />
          ))}
        </Marquee>
      ) : (
        <div className="container-page mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <TestimonialCard key={review._id} review={review} />
          ))}
          <div className="grain relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink p-8 text-bone">
            <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-60 rounded-full bg-brand/30 blur-3xl" />
            <div>
              <p className="heading-display text-4xl">
                La tua opinione <span className="txt-gradient">conta</span>
              </p>
              <p className="mt-3 text-bone/70">
                Bastano due minuti per aiutare chi sta cercando la palestra giusta.
              </p>
            </div>
            <ReviewDialog className="mt-8 w-full" />
          </div>
        </div>
      )}
    </section>
  );
}
