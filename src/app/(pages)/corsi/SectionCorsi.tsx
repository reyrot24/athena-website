import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "../../styles.css";
import { urlFor } from "@/client";

type Corsi = {
  image: string;
  nome: string;
};

type Props = {
  corsi: Corsi[];
};

export type Layout15Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const SectionCorsi = (props: Props) => {
  const { corsi } = {
    ...props,
  } as Props;
  return (
    <section className="mb-20 container">
      <h1 className="flex text-accentYellow justify-center items-center mb-14 text-4xl font-bold md:mb-20 md:text-6xl">
        I NOSTRI CORSI
      </h1>
      <div className=" container grid grid-cols-1 md:grid-cols-3 gap-16">
        {corsi.map((corso, i) => (
          <div key={i}>
            <div className="relative flex items-center  ">
              <Zoom>
                <Image
                  src={urlFor(corso.image).toString()}
                  alt={corso.nome}
                  className="object-contain border border-accentYellow rounded-lg"
                  width={500}
                  height={500}
                />
              </Zoom>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SectionCorsi;
