import React from "react";

import SectionCorsi from "./SectionCorsi";
import { corsiImgEDescrizioni } from "@/constants/corsiImg";

const Corsi = () => {
  return (
    <section className="py-12 md:py-10 mt-[80px] bg-bg text-text">
      <SectionCorsi corsi={corsiImgEDescrizioni} heading="I nostri corsi" />
    </section>
  );
};

export default Corsi;
