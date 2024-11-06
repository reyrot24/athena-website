"use client";

import { useEffect, useState } from "react";
/* import { Button } from "../ui/Button"; */
import Link from "next/link";
import Image from "next/image";
/* import { useTheme } from "next-themes"; */
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";

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

const framerList = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: 0.8,
    duration: 0.8,
  },
};

export type NavbarClientProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const NavbarClient = (props: NavbarClientProps) => {
  const { logo, navLinks /* button */ } = {
    ...props,
  } as Props;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);
  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div exit={{ opacity: 0, z: 100 }}>
          <Loader where="" />
        </motion.div>
      ) : (
        <nav className="flex w-full text-lg items-center border-b border-border-primary bg-bg text-text lg:min-h-18 lg:px-[5%] top-0 fixed z-50">
          <div className="mx-auto size-full lg:flex lg:items-center lg:justify-between lg:gap-4">
            <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
              <Link href={logo.url} onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div {...framerList}>
                  <Image src={logo.src} alt={logo.alt} width={80} height={80} />
                </motion.div>
              </Link>

              <div className="flex items-center gap-4 lg:hidden">
                <button
                  className="-mr-2 flex size-12 flex-col items-center justify-center"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                  <motion.span
                    className="my-[3px] h-0.5 w-6 bg-text"
                    animate={
                      isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"
                    }
                    variants={topLineVariants}
                  />
                  <motion.span
                    className="my-[3px] h-0.5 w-6 bg-text"
                    animate={isMobileMenuOpen ? "open" : "closed"}
                    variants={middleLineVariants}
                  />
                  <motion.span
                    className="my-[3px] h-0.5 w-6 bg-text"
                    animate={
                      isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"
                    }
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
              className="overflow-hidden gap-8 px-[5%] text-center lg:flex lg:items-center lg:justify-end lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
            >
              {navLinks.map((navLink, index) => (
                <motion.div
                  key={index}
                  {...framerList}
                  className="block py-3 text-2xl focus-visible:outline-none lg:py-2 lg:text-xl tracking-wide "
                >
                  <Link
                    href={navLink.url}
                    className="md:animation-link"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  >
                    {navLink.title}
                  </Link>
                </motion.div>
              ))}

              {/* <div className="justify-self-end block md:hidden">
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
              </div> */}
            </motion.div>
          </div>
        </nav>
      )}
    </AnimatePresence>
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
