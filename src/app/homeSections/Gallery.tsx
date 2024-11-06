"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Links } from "@/constants/links";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "../styles.css";
import { motion } from "framer-motion";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  images: ImageProps[];
};

export type Gallery3Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const Gallery = (props: Gallery3Props) => {
  const { heading, images } = {
    ...Gallery3Defaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-bg text-text">
      <div className="">
        <h1 className="flex justify-center items-center mb-14 section-heading  md:mb-20 ">
          {heading}
        </h1>
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:grid-cols-4 md:gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Zoom key={index}>
                <Image
                  src={image.src}
                  alt={image.alt!}
                  width={500}
                  height={500}
                  className="object-contain rounded-lg border border-accentYellow "
                />
              </Zoom>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-20">
          <Link href={Links[3].url}>
            <Button variant="default" className="btn-pad">
              Tutte le foto
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Gallery3Defaults: Gallery3Props = {
  heading: "Galleria",
  images: [
    {
      src: "/Athena_Palestra_1.jpg",
      alt: "Athena palestra 1",
    },
    {
      src: "/Athena_Palestra_2.jpg",
      alt: "Athena palestra 2",
    },
    {
      src: "/Athena_Palestra_3.jpg",
      alt: "Athena palestra 3",
    },
    {
      src: "/Athena_Palestra_4.jpg",
      alt: "Placeholder image 4",
    },
  ],
};

export default Gallery;
