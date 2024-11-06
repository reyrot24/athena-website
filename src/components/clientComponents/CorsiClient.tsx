"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "../../app/styles.css";

type ImageProps = { src: string; alt: string };
type Corsi = { image: ImageProps; heading: string };

type Props = {
  corsi: Corsi[];
};

export type CorsiProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const CorsiClient = (props: CorsiProps) => {
  const { corsi = [] } = { ...props };
  return (
    <motion.div className="grid grid-cols-1 gap-8 items-start gap-y-12 md:grid-cols-2 lg:grid-cols-4 md:gap-y-16 mx-8 md:mx-0">
      {corsi.map((corsi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-6 md:mb-8 flex justify-center items-center ">
            <Zoom>
              <Image
                src={corsi.image.src}
                alt={corsi.image.alt}
                width={500}
                height={500}
                className=" object-contain rounded-lg border border-accentYellow "
              />
            </Zoom>
          </div>
          <h3 className="flex justify-center items-center text-center mb-3 text-2xl md:mb-4 md:text-3xl font-light">
            {corsi.heading}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  );
};
