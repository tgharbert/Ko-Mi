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

// need to refine based on the data model in MVP
type Recipe = {
  title: string;
  author: string;
  description: string;
  name: string;
  keywords: string[];
  instructions: string[];
  recipeInstructions: string[];
  recipeIngredient: any[];
  image: string;
  aggregateRating: number;
  publisher: string;
  recipeYield: string;
  mainEntityOfPage: boolean;
  category?: string[];
  totalTime: string;
  cookTime: string;
  prepTime?: string;
  user?: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRecipeSubmission = async () => {
    try {
      // await fetch("/api/add-recipe", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ recipe }),
      // });
      // console.log(recipe);
      // const recipeData = await JSON.stringify(recipe);
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
    <div className="mr-20 ml-20">
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
      <div className="mt-7 rounded-lg">
        <DescriptionAccordion description={recipe.description} />
      </div>
      <div className="mt-7 rounded-lg">
        <InstructionAccordion instructions={recipe.instructions} />
      </div>
      {/* REFACTOR BASED ON SHARED ACCORDIONS */}
      <div>
        {/* <IngredientAccordion ingredients={recipe.recipeIngredient} /> */}
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
              {recipe.recipeIngredient.map((ingredient, idx) => (
                <li className="pb-4" key={idx}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
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
