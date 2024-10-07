import { buttons } from "@/constants/buttons";
import ContactForm from "@/components/clientComponents/ContactForm";
import MapPalestra from "@/components/clientComponents/MapPalestra";

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
      <div className="container grid grid-cols-1 items-stretch gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <div>
          <div className="mb-10 md:mb-12">
            <h1 className="flex justify-center items-center mb-4 section-heading md:mb-6 ">
              {heading}
            </h1>
            <p className="text-2xl tracking-wide">{description}</p>
          </div>
          <ContactForm button={buttons[3]} />
        </div>
        <div>
          <MapPalestra />
        </div>
      </div>
    </section>
  );
};
