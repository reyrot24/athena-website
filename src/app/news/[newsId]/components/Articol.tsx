import React from "react";
import { RxChevronLeft } from "react-icons/rx";
import RelatedPosts from "./RelatedPosts";
import Link from "next/link";
import { urlFor } from "@/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { newstypes } from "@/types/news";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Zoom from "react-medium-image-zoom";
import "../../../styles.css";
import { BiSolidFilePdf } from "react-icons/bi";

const Articol = (props: newstypes) => {
  const { titolo, data, img, contenuto, slug, pdf } = props;
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
          {img !== null && (
            <div className="w-full">
              <Zoom>
                <Image
                  className="w-full h-[500px] object-contain"
                  src={urlFor(img).toString()}
                  alt="Immagine"
                  width={0}
                  height={500}
                  sizes="100vh"
                />
              </Zoom>
            </div>
          )}
        </div>
        <div className="mt-24 text-xl text-justify ">
          <PortableText value={contenuto} components={components} />
        </div>
        {pdf !== null ? (
          <div className="flex items-center mt-8">
            <a
              href={`/api/${pdf}`}
              target="_blank"
              className="flex flex-col items-center"
            >
              <BiSolidFilePdf size={50} className="text-accentYellow" />
              Apri PDF
            </a>
          </div>
        ) : (
          ""
        )}

        <div className="py-12 md:mt-32">
          <Separator />
          <RelatedPosts slug={slug} />
        </div>
      </div>
    </section>
  );
};

export default Articol;
