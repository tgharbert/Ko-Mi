"use client";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from "@mui/icons-material/Link";

function AdditionalAccordion({
  url,
  recipeYield,
  publisher,
  keywords,
}: {
  url: string;
  recipeYield: number;
  publisher: string;
  keywords: Keywords[];
}) {
  const [open, setOpen] = useState(false);

  // filter the keywords due to raw SQL query for random recipes
  keywords = keywords.reduce((acc: Keywords[], keyword: Keywords) => {
    if (!acc.find((item: Keywords) => item.id === keyword.id)) {
      acc.push(keyword);
    }
    return acc;
  }, []);

  return (
    <div className="rounded-lg border border-gray-200 bg-white text-black">
      <button
        onClick={() => setOpen(!open)}
        aria-controls="additional-content"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 font-semibold text-left"
      >
        Additional Information
        <ExpandMoreIcon
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id="additional-content"
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4">
          <div>
            <p>
              <b>Original URL: </b>
              <a className="underline text-blue" href={url}>
                <LinkIcon className="mr-1" />
                click link
              </a>
            </p>
          </div>
          <div>
            <p>
              <b>Recipe Yield: </b>
              {recipeYield} servings
            </p>
          </div>
          <div>
            <p>
              <b>Original Publisher: </b>
              {publisher}
            </p>
          </div>
          <div>
            <b>Keywords: </b>
            {keywords.map((keyword) => {
              return (
                <p className="italic text-sm" key={keyword.name}>
                  #{keyword.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalAccordion;
