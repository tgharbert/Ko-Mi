import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import { useState } from "react";
import InstructionAccordion from "@/app/components/accordions/InstructionAccordion";
import DescriptionAccordion from "@/app/components/accordions/DescriptionAccordion";
// unable to use this because ingredients are formatted as strings from URL
import IngredientAccordion from "@/app/components/accordions/IngredientAccordion";
import { addRecipe } from "@/lib/addRecipe";
import Button from "@mui/material/Button";
import theme from "@/mui-styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

function RecipeCard({ recipe }: { recipe: RawRecipe }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const he = require("he");
  const handleRecipeSubmission = async () => {
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
    <ThemeProvider theme={theme}>
      <div className="mr-8 ml-8 sm:mr-20 sm:ml-20 flexbox">
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
        <div className="mt-2">
          <Button
            variant="contained"
            className=" bg-lime-500"
            onClick={handleRecipeSubmission}
            color="lime"
          >
            Add Recipe
            <AddIcon className="pl-1" />
          </Button>
        </div>
        {recipe.description ? (
          <div className="flex justify-center">
            <div className="mt-4 rounded-lg sm:w-3/5">
              <DescriptionAccordion description={recipe.description} />
            </div>
          </div>
        ) : (
          <div className="mt-4"></div>
        )}
        {/* REFACTOR BASED ON SHARED ACCORDIONS */}
        <div className="flex justify-center">
          <div className="sm:w-3/5">
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
                <ul className="px-2 list-disc text-left">
                  {recipe.recipeIngredient.map((ingredient, idx: number) => (
                    <li className="pb-4" key={idx}>
                      {/* {ingredient} */}
                      {he.decode(ingredient)}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg sm:w-3/5">
            <InstructionAccordion instructions={recipe.instructions} />
          </div>
        </div>
        <div className="mx-4 pt-7 pb-10"></div>
      </div>
    </ThemeProvider>
  );
}

export default RecipeCard;
