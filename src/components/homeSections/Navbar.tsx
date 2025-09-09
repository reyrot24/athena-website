import NavbarClient from "@/components/clientComponents/NavbarClient";

type ImageProps = {
  url: string;
  src: string;
  alt: string;
};

type ButtonProps = {
  text: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  button: ButtonProps;
  animation: boolean;
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Navbar = (props: Navbar2Props) => {
  const { logo, navLinks, button, animation } = {
    ...props,
  } as Props;

  return (
    <NavbarClient
      animation={animation}
      logo={logo}
      navLinks={navLinks}
      button={button}
    />
  );
};
