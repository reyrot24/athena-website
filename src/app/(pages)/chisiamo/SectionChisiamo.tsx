import { urlFor } from "@/client";
import { chisiamotypes } from "@/types/chisiamo";
/* import { PortableText } from "@portabletext/react"; */
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "../../styles.css";

type Props = {
  heading: string;
  description: string;
  chisiamo: chisiamotypes[];
};

export type Blog41Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

async function SectionChisiamo(props: Blog41Props) {
  const { /* heading */ description, chisiamo } = {
    ...props,
  } as Props;

  return (
    <section className="mb-20 ">
      <h1 className="flex justify-start items-center mb-14 text-2xl font-bold md:mb-20 md:text-3xl">
        I NOSTRI TRAINER
      </h1>
      <p className="description">{description}</p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
        {chisiamo.map((persona, i) => (
          <div key={i}>
            <div className="mb-6 inline-block w-full max-w-full focus-visible:outline-none">
              <div className="w-full overflow-hidden h-full">
                <Zoom classDialog="h-full">
                  <Image
                    src={urlFor(persona.foto).toString()}
                    alt={persona.nome}
                    className="object-contain rounded-lg border border-accentYellow "
                    width={500}
                    height={500}
                  />
                </Zoom>
              </div>
            </div>
            <p className="mb-2 text-accentYellow mr-4 inline-block max-w-full text-sm font-semibold focus-visible:outline-none">
              {persona.lavoro}
            </p>

            <h5 className="text-2xl font-bold md:text-3xl mb-2 block max-w-full focus-visible:outline-none text-nowrap md:text-wrap">
              {persona.nome}
            </h5>

            {/* <div className="description">
              <PortableText
                value={persona.descrizione}
                components={{
                  listItem: {
                    // Ex. 1: customizing common list types
                    bullet: ({ children }) => (
                      <li className="list-disc text-base text-accentYellow">
                        <span className="text-text"> {children}</span>
                      </li>
                    ),
                  },
                }}
              />
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SectionChisiamo;
