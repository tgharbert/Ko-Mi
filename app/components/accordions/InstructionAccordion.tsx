import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

function InstructionAccordion({ instructions }: { instructions: string[] }) {
  const he = require("he");

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="font-semibold text-center"
        >
          Method
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {instructions.map((instruction: string, idx) => {
              return (
                <div className="pb-2 pt-2" key={idx}>
                  {he.decode(instruction)}
                  {/* {instruction} */}
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default InstructionAccordion;
