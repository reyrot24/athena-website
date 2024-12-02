import React from "react";

import SectionCorsi from "./SectionCorsi";
import { corsiImgEDescrizioni } from "@/constants/corsiImg";
import { Navbar } from "../homeSections/Navbar";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";
import { Footer } from "../homeSections/Footer";

const Corsi = () => {
  return (
    <>
      <Navbar
        animation={false}
        logo={images.logo}
        button={buttons[1]}
        navLinks={Links}
      />
      <section className="py-12 md:py-10 mt-[80px] bg-bg text-text">
        <SectionCorsi corsi={corsiImgEDescrizioni} />
      </section>
      <Footer button={buttons[4]} logo={images.logo} columnLinks={Links} />
    </>
  );
};

export default Corsi;
