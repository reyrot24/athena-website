import SectionTestimonianze from "./SectionTestimonianze";
import TestimonialBanner from "./Banner";
import { testimonianzetypes } from "@/types/testimonianze";
import { QueryTestimonianze, sanityFetch } from "@/lib/queries";

export default async function Testimonianze() {
  const testimonianze: testimonianzetypes[] = await sanityFetch({
    query: QueryTestimonianze,
    revalidate: 10,
  });
  return (
    <>
      <TestimonialBanner />
      <section className="px-[5%] py-12 md:py-10 mt-[-40px] bg-bg text-text">
        <SectionTestimonianze
          heading="Testimonianze"
          testimonials={testimonianze}
        />
      </section>
    </>
  );
}
