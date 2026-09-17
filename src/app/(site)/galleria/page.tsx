import type { Metadata } from "next";
import { ImageMasonry } from "@/components/gallery/image-masonry";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { getGallery } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Galleria",
  description: "Le foto di SSD CAM Athena: sala pesi, sale corsi, eventi e momenti di vita in palestra.",
  alternates: { canonical: "/galleria" },
};

export default async function GalleriaPage() {
  const gallery = await getGallery();
  const cover = gallery.find((item) => item.image.width / item.image.height >= 1.25);

  return (
    <PageTransition>
      <PageHero
        eyebrow="Galleria"
        title={
          <>
            Dentro <span className="txt-gradient">Athena</span>
          </>
        }
        description="Sale, attrezzature ed eventi. Tocca una foto per sfogliare la galleria a schermo intero."
        background={cover ? { image: cover.image } : { src: "/Athena_Palestra_1.jpg" }}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          {gallery.length > 0 ? (
            <ImageMasonry
              items={gallery.map((item) => ({
                id: item._id,
                image: item.image,
                alt: item.nomeImg ?? "Foto della palestra",
                caption: item.nomeImg,
              }))}
            />
          ) : (
            <p className="text-center text-muted-foreground">Nuove foto in arrivo.</p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
