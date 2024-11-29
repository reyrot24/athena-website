import { urlFor } from "@/client";
import { Button } from "@/components/ui/Button";
import { QueryNews, sanityFetch } from "@/lib/queries";
import { newstypes } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { RxChevronRight } from "react-icons/rx";
/* import Search from "./Search"; */

type Props = {
  heading: string;
};

export type Layout236Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const SectionNews = async (props: Layout236Props) => {
  const { heading } = { ...props };

  const news: newstypes[] = await sanityFetch({
    query: QueryNews,
    revalidate: 30,
  });

  return (
    <section>
      <h1 className="flex justify-center items-center mb-14 text-4xl font-bold text-text-alternative md:mb-20 md:text-6xl">
        {heading}
      </h1>
      {/*     <Search news={news} /> */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 items-start gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
        {news.map((articol) => (
          <div key={articol.slug} className="h-full flex justify-center">
            <Link
              href={`/news/${articol.slug}`}
              className="flex flex-col justify-between"
            >
              <div className="">
                <Image
                  src={urlFor(articol.img).toString()}
                  alt={articol.titolo}
                  className="object-cover w-full h-[250px] border hover:border-accentYellow"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <h3 className="mt-8 text-xl font-bold md:text-2xl hover:text-accentYellow">
                  {articol.titolo}
                </h3>
                <div className="hidden md:block">{articol.descrizione}</div>
              </div>
              <div className="hidden md:block">
                {new Date(articol.data).toLocaleDateString()}
              </div>
              <div className=" flex justify-start items-center gap-2 mt-4">
                <Button
                  variant="link"
                  className="text-base p-0 text-accentYellow hover:underline"
                >
                  Vai
                </Button>

                <RxChevronRight
                  size="22px"
                  className="cursor-pointer text-text hover:text-accentYellow"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
