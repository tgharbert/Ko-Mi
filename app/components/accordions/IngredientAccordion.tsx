import Accordion from "@mui/material/Accordion";
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

function IngredientAccordion({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <Accordion className="rounded-lg">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        className="font-semibold text-center"
      >
        Recipe Ingredients
      </AccordionSummary>
      <AccordionDetails>
        <ul className="list-disc text-left ml-2">
          {ingredients.map((ingredient, idx) => (
            <li className="pb-4" key={idx}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}

export default IngredientAccordion;
