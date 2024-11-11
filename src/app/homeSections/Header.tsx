import { Carousell } from "../../../carousell/Carousel";
/* import { Button } from "@/components/ui/Button"; */
import "../../styles/animation.css";

type ButtonProps = {
  text: string;
};

type Props = {
  button: ButtonProps;
};

export type Header5Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header = (props: Header5Props) => {
  const {
    /* button */
  } = {
    ...props,
  } as Props;

  return (
    <header className="mt-[80px] bg-[#242424] h-full relative text-center w-full flex justify-center items-center">
      <Carousell />
      <div className="absolute ">
        <div className="mb-5 text-white heading">
          We are <h1 className="sign">athena</h1>
        </div>
        {/* <div>
          <Button variant="default" className="btn-pad">
            {button.text}
          </Button>
        </div> */}
      </div>
    </header>
  );
};
