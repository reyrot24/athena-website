import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { images } from "@/constants/images";
import Fade from "embla-carousel-fade";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(), Fade()]);

  return (
    <section className="embla m-auto  ">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {images.header.map((image, index) => (
            <div className="embla__slide " key={index}>
              <img src={image.src} className=" w-full h-full  object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
