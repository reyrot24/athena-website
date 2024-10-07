"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
    <motion.div className="grid grid-cols-1 gap-8 items-start gap-y-12 md:grid-cols-2 lg:grid-cols-4 md:gap-y-16 mx-16 md:mx-0">
      {corsi.map((corsi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.4 }}
          viewport={{ once: true, amount: 0.7 }}
        >
          <div className="mb-6 md:mb-8 flex justify-center items-center">
            <Image
              src={corsi.image.src}
              alt={corsi.image.alt}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full md:h-96 border border-accentYellow rounded-lg object-cover"
            />
          </div>
          <h3 className="flex justify-center items-center mb-3 text-2xl md:mb-4 md:text-3xl font-light">
            {corsi.heading}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  );
};
