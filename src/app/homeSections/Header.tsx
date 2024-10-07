import { Carousell } from "../../../carousell/Carousel";
import { Button } from "@/components/ui/Button";

type ButtonProps = {
  text: string;
};

type Props = {
  heading: string;
  description: string;
  button: ButtonProps;
};

export type Header5Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header = (props: Header5Props) => {
  const { heading, button } = {
    ...Header5Defaults,
    ...props,
  } as Props;

  return (
    <header className="px-[5%] z-10 ">
      <div className="container">
        <div className="flex justify-center items-center max-h-[60rem] min-h-svh py-16 md:py-24 lg:py-28">
          <div className="flex justify-center items-center flex-col">
            <h1 className="mb-5 text-white heading">{heading}</h1>
            <div className="mt-6 flex">
              <Button variant="default" className="btn-pad">
                {button.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 mt-[80px]">
        <Carousell />
      </div>
    </header>
  );
};

export const Header5Defaults: Header5Props = {
  heading: "Change your life",
};
