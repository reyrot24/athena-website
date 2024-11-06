"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "../styles.css";

type ImageProps = { src: string; alt: string };

type Corsi = {
  image: ImageProps;
  heading?: string;
  descrizione?: string;
};

type Props = {
  heading: string;
  corsi: Corsi[];
};

export type Layout15Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const item = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
};

const SectionCorsi = (props: Props) => {
  const { /* heading */ corsi } = {
    ...props,
  } as Props;
  return (
    <section className="mb-20 container">
      <h1 className="flex text-accentYellow justify-center items-center mb-14 text-4xl font-bold md:mb-20 md:text-6xl">
        I NOSTRI CORSI
      </h1>
      <motion.div className=" container grid grid-cols-1 md:grid-cols-3 gap-16">
        {corsi.map((corso, i) => (
          <motion.div
            variants={item}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.3, delay: i * 0.1 }}
            viewport={{ once: true }}
            key={i}
          >
            <div className="relative flex items-center  ">
              <Zoom>
                <Image
                  src={corso.image.src}
                  className="object-contain border border-accentYellow rounded-lg"
                  alt={corso.image.alt}
                  width={500}
                  height={500}
                />
              </Zoom>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
export default SectionCorsi;
