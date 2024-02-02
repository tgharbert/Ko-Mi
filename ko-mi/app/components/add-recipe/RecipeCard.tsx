import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
// import Button from "@mui/material/Button";

// need to refine based on the data model in MVP
type Recipe = {
  title: string;
  author: string;
  description: string;
  name: string;
  keywords: string[];
  instructions: string[];
  recipeInstructions: string[];
  recipeIngredient: string[];
  image: string;
  aggregateRating: number;
  publisher: string;
  recipeYield: string;
  mainEntityOfPage: boolean;
  category?: string[];
  totalTime: string;
  cookTime: string;
  prepTime?: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  // need to route to the homepage '/'
  const handleRecipeSubmission = async () => {
    try {
      const response = await fetch("/api/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="font-semibold text-center"
          >
            Recipe Description
          </AccordionSummary>
          <AccordionDetails>
            <p>{recipe.description}</p>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="mt-7 rounded-lg">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="font-semibold text-center"
          >
            Recipe Instructions
          </AccordionSummary>
          <AccordionDetails>
            <ul className=" text-left">
              {recipe.instructions.map((instruction, idx) => (
                <li className="pb-4" key={idx}>
                  {instruction}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
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
