import { urlFor } from "@/client";
import { getArticols, QueryRelatedArticols } from "@/lib/queries";
import { newstypes } from "@/types/news";
import { Button } from "@relume_io/relume-ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

type Props = {
  slug: string;
};

const RelatedPosts = async (props: Props) => {
  const { slug } = props;
  const relatedArticols: newstypes[] = await getArticols(
    QueryRelatedArticols,
    slug
  );

  return (
    <div className="mt-8">
      <h1 className="mb-8 text-2xl font-bold text-text-alternative md:mb-12 md:text-4xl">
        Altre news
      </h1>
      <div className="grid md:grid-cols-2 gap-x-24 gap-y-8 py-2 ">
        {relatedArticols.map((articol, i) => (
          <div key={i} className="flex flex-col md:gap-8">
            <Link href={`/news/${articol.slug}`} className="mb-6 w-full">
              {articol.img !== null && (
                <Image
                  src={urlFor(articol.img).toString()}
                  alt={articol.titolo}
                  className="border hover:border-accentYellow w-full h-[28rem] object-cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              )}
            </Link>
            <div className="flex justify-center items-start flex-col mt-4 md:mt-0">
              <h3 className="mb-3 text-xl font-bold md:text-2xl">
                {articol.titolo}
              </h3>
              <div className="pr-8">
                <p className="text-lg">{articol.descrizione}</p>
              </div>
              <Link href={`/news/${articol.slug}`}>
                <div className="mt-6 flex justify-end items-end gap-2 md:mt-8 text-accentYellow">
                  <Button
                    variant="link"
                    className="text-base p-0 hover:underline"
                  >
                    See more
                  </Button>
                  <RxChevronRight size="22px" className="cursor-pointer" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
