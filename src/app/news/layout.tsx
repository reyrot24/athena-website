import React from "react";
import { Navbar } from "../homeSections/Navbar";
import { Footer } from "../homeSections/Footer";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        animation={false}
        logo={images.logo}
        button={buttons[1]}
        navLinks={Links}
      />
      {children}
      <Footer button={buttons[4]} logo={images.logo} columnLinks={Links} />
    </>
  );
}
