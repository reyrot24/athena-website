import { oraritypes } from "@/types/orari";
import ClientComponentOrari from "./ClientSectionOrari";
import { QueryCorsiEOrari, sanityFetch } from "@/lib/queries";
import { Footer } from "../homeSections/Footer";
import { Navbar } from "../homeSections/Navbar";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";

const Orari = async () => {
  const orari: oraritypes[] = await sanityFetch({
    query: QueryCorsiEOrari,
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
        <h1 className="flex text-accentYellow justify-center items-center mb-14 text-4xl font-bold md:mb-20 md:text-6xl">
          ORARI CORSI
        </h1>
        <ClientComponentOrari response={orari} />
      </section>
      <Footer button={buttons[4]} logo={images.logo} columnLinks={Links} />
    </>
  );
};

export default Orari;
