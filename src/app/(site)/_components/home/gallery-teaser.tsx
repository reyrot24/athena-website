import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GalleryMosaic } from "@/components/gallery/gallery-mosaic";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getGallery } from "@/sanity/data";

export async function GalleryTeaser() {
  const gallery = await getGallery();
  if (gallery.length === 0) return null;

  return (
    // `dark` forza la palette scura anche con il tema chiaro: ritmo tra sezioni.
    <section className="dark bg-background py-24 text-foreground sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Galleria"
            title={
              <>
                Dentro <span className="txt-gradient">Athena</span>
              </>
            }
            description="Sale, attrezzature e momenti di vita in palestra. Tocca una foto per ingrandirla."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/galleria">
              Tutte le foto <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-14">
          <GalleryMosaic items={gallery} />
        </div>
      </div>
    </section>
  );
}
