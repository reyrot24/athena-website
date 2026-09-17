import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { site } from "@/lib/site";
import { AboutTeaser } from "./_components/home/about-teaser";
import { ContactSection } from "./_components/home/contact-section";
import { DisciplinesSection } from "./_components/home/disciplines-section";
import { GalleryTeaser } from "./_components/home/gallery-teaser";
import { Hero } from "./_components/home/hero";
import { NewsTeaser } from "./_components/home/news-teaser";
import { StatsStrip } from "./_components/home/stats-strip";
import { TestimonialsTeaser } from "./_components/home/testimonials-teaser";
import { TodaySection } from "./_components/home/today-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/og`,
  telephone: "+393920595980",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: site.address.province,
    addressCountry: "IT",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  sameAs: [site.socials.instagram, site.socials.facebook],
};

export default function HomePage() {
  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <StatsStrip />
      <DisciplinesSection />
      <TodaySection />
      <AboutTeaser />
      <GalleryTeaser />
      <NewsTeaser />
      <TestimonialsTeaser />
      <ContactSection />
    </PageTransition>
  );
}
