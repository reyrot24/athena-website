import React from "react";
import { SectionNews } from "./SectionNews";

{
  /*Mettere un filtro per cercare le news in base alla data o anche una barra di ricerca */
}

const News = () => {
  return (
    <div className="px-[5%] py-12 md:py-10 mt-[80px] bg-bg text-text">
      <SectionNews heading="News" />
    </div>
  );
};

export default News;
