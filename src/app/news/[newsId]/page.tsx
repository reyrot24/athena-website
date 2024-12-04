import React from "react";
import Articol from "./components/Articol";
import { getArticol, QueryIndividualArticol } from "@/lib/queries";
import { VideoArticol } from "./components/VideoArticol";

type Props = Promise<{
  newsId: string;
}>;

export default async function NewsPage(props: { params: Props }) {
  const params = await props.params;
  const newsId = params.newsId;
  const articol = await getArticol(QueryIndividualArticol, newsId);

  return (
    <div className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      {articol.slug === "impossible" ? (
        <VideoArticol
          titolo={articol.titolo}
          data={articol.data}
          img={articol.img}
          contenuto={articol.contenuto}
          slug={newsId}
        />
      ) : (
        <Articol
          titolo={articol.titolo}
          data={articol.data}
          img={articol.img}
          contenuto={articol.contenuto}
          slug={newsId}
        />
      )}
    </div>
  );
}
