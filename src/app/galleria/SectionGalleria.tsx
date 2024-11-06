import { urlFor } from "@/client";
import { galleriatypes } from "@/types/galleria";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "../styles.css";

type Props = {
  heading: string;
  response: galleriatypes[];
};

export type Gallery10Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const SectionGallery = (props: Gallery10Props) => {
  const { heading, response } = {
    ...props,
  } as Props;

  return (
    <div className="container mb-20">
      <h1 className="flex justify-center items-center mb-14 text-4xl font-bold text-text-alternative md:mb-20 md:text-6xl">
        {heading}
      </h1>
      <div className="grid gap-16 grid-cols-1 md:grid-cols-12">
        {response.map((img, i) => (
          <div className="col-span-1 md:col-span-4" key={i}>
            <Zoom>
              <Image
                src={urlFor(img.image).toString()}
                alt={img.nomeImg}
                className="w-full h-[250px] md:h-[300px] object-cover border border-accentYellow"
                width={0}
                height={0}
                sizes="100vw"
              />
            </Zoom>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGallery;
