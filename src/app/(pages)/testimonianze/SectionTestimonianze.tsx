import { testimonianzetypes } from "@/types/testimonianze";
import { BiSolidStar } from "react-icons/bi";

type Props = {
  heading: string;
  description: string;
  testimonials: testimonianzetypes[];
};

export type Testimonial18Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const SectionTestimonianze = (props: Testimonial18Props) => {
  const { heading, testimonials } = {
    ...Testimonial18Defaults,
    ...props,
  } as Props;
  return (
    <div className="container mb-20">
      <h1 className="flex text-accentYellow justify-center items-center mb-14 text-4xl font-bold md:mb-20 md:text-6xl">
        {heading}
      </h1>
      {/* <p className="md:text-md">{description}</p> */}

      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="mb-8 inline-block w-full border border-border-primary p-6 md:p-8"
          >
            <div className="mb-5 md:mb-6">
              <div className="mb-6 flex">
                {Array(testimonial.valutazione)
                  .fill(null)
                  .map((_, starIndex) => (
                    <BiSolidStar
                      key={starIndex}
                      className="mr-1 size-6 text-accentYellow"
                    />
                  ))}
              </div>
              <blockquote className="md:text-md">
                {testimonial.message}
              </blockquote>
            </div>

            <p className="text-center font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionTestimonianze;

const Testimonial18Defaults: Testimonial18Props = {
  heading: "Customer testimonials",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};
