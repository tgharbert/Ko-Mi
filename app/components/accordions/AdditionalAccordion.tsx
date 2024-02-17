import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import LinkIcon from "@mui/icons-material/Link";

type Keywords = {
  id: number;
  name: string;
  recipeId: number;
};

const AdditionalAccordion = ({
  url,
  recipeYield,
  publisher,
  keywords,
}: {
  url: string;
  recipeYield: number;
  publisher: string;
  keywords: Keywords[];
}) => {
  return (
    <Accordion className="rounded-lg">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        className="font-semibold text-center"
      >
        Additional Information
      </AccordionSummary>
      <AccordionDetails>
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
          <p>
            <b>Keywords: </b>
            {keywords.map((keyword) => {
              return (
                <p className="italic text-sm" key={keyword.name}>
                  #{keyword.name}
                </p>
              );
            })}
          </p>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalAccordion;
