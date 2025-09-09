import { QueryCorsiOrari, sanityFetch } from "@/lib/queries";
import { oraritypes } from "@/types/orari";
import ClientComponentOrari from "./ClientSectionOrari";

const Orari = async () => {
  const orari: oraritypes[] = await sanityFetch({
    query: QueryCorsiOrari,
    revalidate: 10,
  });

  return (
    <section className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      <h1 className="flex text-accentYellow justify-center items-center mb-14 text-4xl font-bold md:mb-20 md:text-6xl">
        ORARI CORSI
      </h1>
      <ClientComponentOrari response={orari} />
    </section>
  );
};

export default Orari;
