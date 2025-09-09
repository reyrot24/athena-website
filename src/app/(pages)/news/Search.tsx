import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { newstypes } from "@/types/news";
import { SearchIcon } from "lucide-react";
/* import React, { useState } from "react"; */

type props = {
  news: newstypes[];
};

const Search = async ({} /* news */ : props) => {
  /*   const [query, setQuery] = useState(""); */

  const handleSearch = () => {};

  return (
    <div className="ml-auto w-full md:w-auto">
      <div className="relative flex-1 flex-grow">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          /*   onChange={(e) => setQuery(e.target.value)} */
          className="w-full rounded-lg bg-background pl-8 md:w-[336px]"
        />
        <Button onClick={handleSearch}>Cerca</Button>
      </div>
    </div>
  );
};

export default Search;
