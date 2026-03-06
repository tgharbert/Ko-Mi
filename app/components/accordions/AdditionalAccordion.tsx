import Accordion from "@/app/components/Accordion";
import { Link as LinkIcon } from "lucide-react";

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
  // filter the keywords due to raw SQL query for random recipes
  keywords = keywords.reduce((acc: Keywords[], keyword: Keywords) => {
    if (!acc.find((item: Keywords) => item.id === keyword.id)) {
      acc.push(keyword);
    }
    return acc;
  }, []);

  return (
    <Accordion title="Additional Information" maxHeight="max-h-[500px]">
      <div>
        <p>
          <b>Original URL: </b>
          <a className="underline text-blue" href={url}>
            <LinkIcon className="mr-1 inline" size={16} />
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
            <p className="italic text-sm" key={keyword.id}>
              #{keyword.name}
            </p>
          );
        })}
      </div>
    </Accordion>
  );
}

export default AdditionalAccordion;
