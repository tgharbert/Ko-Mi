import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Ingredient = {
  id: number;
  name: string;
  locationId: number;
  recipeId: number;
  types: string[];
};

const IngredientAccordion = ({
  ingredients,
}: {
  ingredients: Ingredient[];
}) => {
  return (
    <Accordion className="mt-7 rounded-lg">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        className="font-semibold text-center"
      >
        Recipe Ingredients
      </AccordionSummary>
      <AccordionDetails>
        <ul className="px-2 list-disc text-left">
          {ingredients.map((ingredient, idx) => (
            <li className="pb-4" key={idx}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default IngredientAccordion;
