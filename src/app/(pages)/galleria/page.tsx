import React from "react";
import SectionGalleria from "./SectionGalleria";
import { galleriatypes } from "@/types/galleria";
import { QueryGalleria, sanityFetch } from "@/lib/queries";

const Galleria = async () => {
  const galleria: galleriatypes[] = await sanityFetch({
    query: QueryGalleria,
    revalidate: 10,
  });
  return (
    <section className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      <SectionGalleria response={galleria} />
    </section>
  );
};

export default Galleria;
