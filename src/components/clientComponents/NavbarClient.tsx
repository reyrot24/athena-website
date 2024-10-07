"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

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

export type NavbarClientProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const NavbarClient = (props: NavbarClientProps) => {
  const { logo, navLinks, button } = {
    ...props,
  } as Props;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="mx-auto size-full lg:flex lg:items-center lg:justify-between lg:gap-4">
      <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
        <Link href={logo.url}>
          <Image src={logo.src} alt={logo.alt} width={80} height={80} />
        </Link>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-text"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-text"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-text"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
      </div>
      <motion.div
        variants={{
          open: {
            height: "var(--height-open, 100dvh)",
          },
          close: {
            height: "var(--height-closed, 0)",
          },
        }}
        animate={isMobileMenuOpen ? "open" : "close"}
        initial="close"
        exit="close"
        transition={{ duration: 0.4 }}
        className="overflow-hidden gap-4 px-[5%] text-center lg:flex lg:items-center lg:justify-end lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
      >
        {navLinks.map((navLink, index) => (
          <div
            key={index}
            className="block py-3 text-2xl focus-visible:outline-none lg:px-5 lg:py-2 lg:text-xl tracking-wide "
          >
            <Link
              href={navLink.url}
              className="md:animation-link"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {navLink.title}
            </Link>
          </div>
        ))}

        <div className="justify-self-end block md:hidden">
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="block py-3 text-2xl focus-visible:outline-none lg:px-5 lg:py-2 lg:text-xl tracking-wide"
          >
            Contattaci
          </Link>
        </div>

        <div className="justify-self-end hidden lg:block">
          <Link href="/#contact">
            <Button className="btn-pad" variant="default">
              {button.text}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

export default NavbarClient;
