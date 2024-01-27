import Image from "next/image";
import { useState } from "react";
// import addRecipe from "../api/addRecipe/route";

// need to refine based on the data model in MVP
type Recipe = {
  title: string;
  author: string;
  description: string;
  name: string;
  keywords: string[];
  recipeInstructions: object[];
  recipeIngredient: string[];
  image: string;
  aggregateRating: number;
  cuisine: string;
  publisher: string;
  recipeYield: number;
  mainEntityOfPage: boolean;
  totalTime: string;
  cookTime: string;
  prepTime?: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  // console.log(recipe);
  const [showInstruction, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleRecipeSubmission = async () => {
    try {
      const response = await fetch("/api/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      console.log(response);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="mr-20 ml-20">
      <div>
        <h1 className="text-xl pt-4 font-semi-bold">{recipe.name}</h1>
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
      <div className="pt-4 pb-4">
        <p className="text-lg italic">Description: </p>
        <p>{recipe.description}</p>
      </div>
      {/* BUTTON TO SHOW MORE... */}
      <div>
        <button>Show Instructions</button>
      </div>
      <div className="pt-4 pb-4 ">
        <p className="text-lg italic">Instructions: </p>
        <ul className="list-decimal text-left">
          {recipe.recipeInstructions.map((instruction, idx) => (
            <li className="pb-4" key={idx}>
              {instruction.text}
            </li>
          ))}
        </ul>
      </div>
      {/* BUTTON TO SHOW MORE... */}
      <div className="pt-4 pb-4">
        <p className="text-lg italic">Ingredients: </p>
        <ul className="px-2 list-disc text-left">
          {recipe.recipeIngredient.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mx-4 pb-10">
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
