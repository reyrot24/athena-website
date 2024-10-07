"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Links } from "@/constants/links";
import { CorsiClient } from "@/components/clientComponents/CorsiClient";
import { corsi4Img } from "@/constants/corsiImg";

type Props = {
  heading: string;
};

export type CorsiProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Corsi = (props: CorsiProps) => {
  const { heading } = { ...props, ...CorsiDefaults };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-bg2 text-text">
      <div className="">
        <h1 className="flex justify-center items-center mb-14 section-heading md:mb-20 ">
          {heading}
        </h1>
        <CorsiClient corsi={corsi4Img} />

        <div className="flex justify-center items-center mt-20">
          <Link href={Links[1].url}>
            <Button variant="default" className="btn-pad">
              Tutti i corsi
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const CorsiDefaults: CorsiProps = {
  heading: "Corsi",
};

Corsi.displayName = "Corsi";
