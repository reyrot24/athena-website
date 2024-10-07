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
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Navbar = (props: Navbar2Props) => {
  const { logo, navLinks, button } = {
    ...props,
  } as Props;

  return (
    <nav className="flex w-full text-lg items-center border-b border-border-primary bg-bg text-text lg:min-h-18 lg:px-[5%] top-0 fixed z-50">
      <NavbarClient logo={logo} navLinks={navLinks} button={button} />
    </nav>
  );
};
