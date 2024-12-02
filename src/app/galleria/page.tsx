import React from "react";
import SectionGalleria from "./SectionGalleria";
import { galleriatypes } from "@/types/galleria";
import { QueryGalleria, sanityFetch } from "@/lib/queries";
import { Navbar } from "../homeSections/Navbar";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";
import { Footer } from "../homeSections/Footer";

const Galleria = async () => {
  const galleria: galleriatypes[] = await sanityFetch({
    query: QueryGalleria,
    revalidate: 10,
  });
  return (
    <>
      <Navbar
        animation={false}
        logo={images.logo}
        button={buttons[1]}
        navLinks={Links}
      />
      <section className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
        <SectionGalleria response={galleria} />
      </section>
      <Footer button={buttons[4]} logo={images.logo} columnLinks={Links} />
    </>
  );
};

export default Galleria;
