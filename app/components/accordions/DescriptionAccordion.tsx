import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function DescriptionAccordion({ description }: { description: string }) {
  return (
    <Accordion className="rounded-lg">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        className="font-semibold text-center"
      >
        Recipe Description
      </AccordionSummary>
      <AccordionDetails>
        <p>{description}</p>
      </AccordionDetails>
    </Accordion>
  );
}

export default DescriptionAccordion;
