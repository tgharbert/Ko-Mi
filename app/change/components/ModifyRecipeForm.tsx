import ModifyIngredients from "./ModifyIngredients";
import ModifyNameAndPhoto from "./ModifyNameAndPhoto";
import ModifyMethods from "./ModifyMethods";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModifyKeywords from "./ModifyKeywords";

const ModifyRecipeForm = async ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="flexbox mr-8 ml-8 sm:mr-20 sm:ml-20 ">
      <ModifyNameAndPhoto recipe={recipe} />

      <div className="flex justify-center">
        <div className="sm:w-2/5">
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
              <ModifyIngredients ingredients={recipe.ingredients} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="sm:w-2/5">
          <Accordion className="rounded-lg">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="font-semibold text-center"
            >
              Recipe Method
            </AccordionSummary>
            <AccordionDetails>
              <ModifyMethods methods={recipe.instructions} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="sm:w-2/5">
          <Accordion className="rounded-lg">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="font-semibold text-center"
            >
              Recipe Keywords
            </AccordionSummary>
            <AccordionDetails>
              <ModifyKeywords keywords={recipe.keywords} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ModifyRecipeForm;
