import React from "react";
import SectionCorsi from "./SectionCorsi";
import { QueryCorsiImg, sanityFetch } from "@/lib/queries";

const Corsi = async () => {
  const corsiImg: [] = await sanityFetch({
    query: QueryCorsiImg,
    revalidate: 10,
  });
  return (
    <section className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      <SectionCorsi corsi={corsiImg} />
    </section>
  );
};

export default Corsi;
