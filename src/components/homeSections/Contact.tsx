import MapPalestra from "@/components/clientComponents/MapPalestra";
import { images } from "@/constants/images";
import { ConsentAwareWrapper } from "@mep-agency/next-iubenda";
import Image from "next/image";

type Props = {
  heading: string;
  description: string;
};

export type Contact9Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Contact = (props: Contact9Props) => {
  const { heading, description } = {
    ...props,
  } as Props;

  return (
    <section
      className="px-[5%] py-16 md:py-24 bg-bg2 text-text lg:py-28"
      id="contact"
    >
      <div className="container grid grid-cols-1 items-stretch gap-y-12 md:grid-flow-row md:gap-x-12 lg:gap-x-20">
        <div>
          <div className="mb-10 md:mb-12">
            <h1 className="flex justify-center items-center mb-4 section-heading md:mb-6 ">
              {heading}
            </h1>
            <p className="text-2xl tracking-wide">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ConsentAwareWrapper requiredGdprPurposes={["experience"]}>
            <div className="w-full h-96 flex items-center text-black">
              <MapPalestra />
            </div>
          </ConsentAwareWrapper>
          <div className="flex justify-center">
            <a
              aria-label="Chat on WhatsApp"
              href="https://wa.me/+393920595980"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={400}
                height={400}
                alt={images.whatsapp.alt}
                src={images.whatsapp.src}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
