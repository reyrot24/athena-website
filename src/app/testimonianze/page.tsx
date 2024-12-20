import React from "react";
import SectionTestimonianze from "./SectionTestimonianze";
import { Navbar } from "../homeSections/Navbar";
import { Footer } from "../homeSections/Footer";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";

const Testimonianze = () => {
  return (
    <>
      <Navbar
        animation={false}
        logo={images.logo}
        button={buttons[1]}
        navLinks={Links}
      />
      <section className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
        <SectionTestimonianze heading="Testimonianze" />
      </section>
      <Footer button={buttons[4]} logo={images.logo} columnLinks={Links} />
    </>
  );
};

export default Testimonianze;
