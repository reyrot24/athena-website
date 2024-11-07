import React from "react";
import SectionChisiamo from "./SectionChisiamo";
import { chisiamotypes } from "@/types/chisiamo";
import { QueryChiSiamo, sanityFetch } from "@/lib/queries";
import SectionStoria from "./SectionStoria";
import { Footer } from "../homeSections/Footer";
import { Navbar } from "../homeSections/Navbar";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";

export default async function ChiSiamo() {
  const chisiamo: chisiamotypes[] = await sanityFetch({
    query: QueryChiSiamo,
  });

  return (
    <>
      <Navbar
        animation={false}
        logo={images.logo}
        button={buttons[1]}
        navLinks={Links}
      />
      <section className="px-[5%] py-12 md:py-10 mt-[80px] text-text bg-bg">
        <h1 className="flex text-accentYellow justify-center items-center mb-14 text-4xl font-bold  md:mb-20 md:text-6xl">
          CHI SIAMO
        </h1>

        <SectionStoria heading="La nostra storia" />
        <SectionChisiamo heading="I nostri trainer" chisiamo={chisiamo} />
      </section>
      <Footer button={buttons[4]} logo={images.logo} columnLinks={Links} />
    </>
  );
}
