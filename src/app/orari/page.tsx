import { oraritypes } from "@/types/orari";
import ClientComponentOrari from "./ClientSectionOrari";
import { QueryCorsiEOrari, sanityFetch } from "@/lib/queries";

const Orari = async () => {
  const orari: oraritypes[] = await sanityFetch({
    query: QueryCorsiEOrari,
    revalidate: 10,
  });

  return (
    <section className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      <h1 className="flex justify-center items-center mb-14 text-4xl font-bold md:mb-20 md:text-6xl">
        Orari
      </h1>
      <ClientComponentOrari response={orari} />
    </section>
  );
};

export default Orari;
