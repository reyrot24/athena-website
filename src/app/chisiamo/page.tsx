import React from "react";
import SectionChisiamo from "./SectionChisiamo";
import { chisiamotypes } from "@/types/chisiamo";
import { QueryChiSiamo, sanityFetch } from "@/lib/queries";
import SectionStoria from "./SectionStoria";

export default async function ChiSiamo() {
  const chisiamo: chisiamotypes[] = await sanityFetch({
    query: QueryChiSiamo,
  });

  return (
    <section className="px-[5%] py-12 md:py-10 mt-[80px] text-text bg-bg">
      <h1 className="flex justify-center items-center mb-14 text-4xl font-bold  md:mb-20 md:text-6xl">
        Chi siamo
      </h1>

      <SectionStoria heading="La nostra storia" />
      <SectionChisiamo heading="I nostri trainer" chisiamo={chisiamo} />
    </section>
  );
}
