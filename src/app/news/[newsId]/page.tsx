import React from "react";
import Articol from "./components/Articol";
import { getArticol, QueryIndividualArticol } from "@/lib/queries";

type Props = {
  params: { newsId: string };
};

export default async function NewsPage({ params }: Props) {
  const slug = params.newsId;
  const articol = await getArticol(QueryIndividualArticol, slug);

  return (
    <div className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      <Articol
        titolo={articol.titolo}
        data={articol.data}
        img={articol.img}
        contenuto={articol.contenuto}
        slug={slug}
      />
    </div>
  );
}
