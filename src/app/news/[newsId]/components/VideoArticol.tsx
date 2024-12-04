import React from "react";
import { RxChevronLeft } from "react-icons/rx";
import RelatedPosts from "./RelatedPosts";
import Link from "next/link";
import { urlFor } from "@/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { newstypes } from "@/types/news";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const VideoArticol = async (props: newstypes) => {
  const { titolo, data, img, contenuto, slug } = props;
  const date = new Date(data).toLocaleDateString();

  const components: PortableTextComponents = {
    marks: {
      // Ex. 2: rendering a custom `link` annotation
      link: ({ value, children }) => {
        return (
          <Link
            href={value?.href}
            target="_blank"
            className="text-accentYellow"
          >
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => (
        <Image
          className="w-full h-full object-contain"
          src={urlFor(value).toString()}
          alt="Immagine"
          width={0}
          height={0}
          sizes="100vw"
        />
      ),
    },
  };

  const video =
    "https://d40aayui6fhg4khn.public.blob.vercel-storage.com/Video-CQdet7xCoYB7i9McaJhn6EYOhDYqdr.mp4";
  console.log(video);
  return (
    <section>
      <div className="container">
        <div className="flex w-full gap-8  items-start flex-col md:flex-row ">
          <div className="w-full mb-8 md:mb-0 flex flex-col items-start justify-start">
            <div className="mb-4 md:mb-10 flex items-center justify-start">
              <RxChevronLeft className="flex items-center text-accentYellow" />
              <h3 className="cursor-pointer">
                <Link
                  href="/news"
                  className="hover:underline text-accentYellow"
                >
                  Tutti i post
                </Link>
              </h3>
            </div>
            <h1 className="mb-8 w-full text-4xl font-bold text-text-alternative md:mb-12 md:text-6xl">
              {titolo}
            </h1>

            <p className="text-sm">
              Pubblicato il <span className="text-accentYellow">{date}</span>
            </p>
          </div>
          <div className="w-full h-96 flex justify-center">
            <video
              width="320"
              height="240"
              controls
              preload="none"
              className=""
              poster={urlFor(img).toString()}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="mt-24 text-xl text-justify ">
          <PortableText value={contenuto} components={components} />
        </div>

        <div className="py-12 md:mt-32">
          <Separator />
          <RelatedPosts slug={slug} />
        </div>
      </div>
    </section>
  );
};
