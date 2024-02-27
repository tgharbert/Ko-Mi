import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useState } from "react";
import InstructionAccordion from "../accordions/InstructionAccordion";
import DescriptionAccordion from "../accordions/DescriptionAccordion";
// unable to use this because ingredients are formatted as strings from URL
import IngredientAccordion from "../accordions/IngredientAccordion";
import { addRecipe } from "@/lib/addRecipe";
// import { addRecipe } from "../../../lib/addRecipe";

const RecipeCard = ({ recipe }: { recipe: RawRecipe }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRecipeSubmission = async () => {
    // console.log("recipe: ", recipe);
    try {
      await addRecipe(recipe);
      setIsLoading(true);
      router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="mr-20 ml-20 flexbox">
      <div>
        <h1 className="text-xl pt-4 font-semi-bold">{recipe.name}</h1>
      </div>
      <div>
        <p className="text-sm pt-2 italic">by: {recipe.author}</p>
      </div>
      <div className="pt-4 pb-4 flex items-center justify-center">
        <Image
          width="400"
          height="400"
          src={recipe.image}
          alt="recipe-photo"
          className="rounded-lg"
        />
      </div>
      <div className="flex justify-center">
        <div className=" mt-7 rounded-lg sm:w-3/5">
          <DescriptionAccordion description={recipe.description} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-7 rounded-lg sm:w-3/5">
          <InstructionAccordion instructions={recipe.instructions} />
        </div>
      </div>
      {/* REFACTOR BASED ON SHARED ACCORDIONS */}
      <div className="flex justify-center">
        <div className="sm:w-3/5">
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
                {recipe.recipeIngredient.map((ingredient, idx: number) => (
                  <li className="pb-4" key={idx}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="mx-4 pt-7 pb-10">
        <button
          onClick={() => handleRecipeSubmission()}
          className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
