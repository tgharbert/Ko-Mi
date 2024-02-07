import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const AdditionalAccordion = ({
  url,
  recipeYield,
  publisher,
  keywords,
}: {
  url: string;
  recipeYield: string;
  publisher: string;
  keywords: string[];
}) => {
  return (
    <Accordion className="mt-7 rounded-lg">
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
            <a href={url}>link</a>
          </p>
        </div>
        <div>
          <p>
            <b>Recipe Yield: </b>
            {recipeYield}
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
            {keywords.map((keyword, idx) => {
              return (
                <p className="italic text-sm" key={idx}>
                  #{keyword}
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
