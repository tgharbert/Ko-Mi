"use client";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import getData from "../../utils/scraper";

// type Recipe = {
//   title: string;
//   author: string;
//   description: string;
//   name: string;
//   keywords: string[];
//   instructions: string[];
//   image: string[];
//   aggregateRating: number;
//   cuisine: string;
//   publisher: string;
//   recipeYield: number;
//   mainEntityOfPage: boolean;
//   totalTime: string;
//   cookTime: string;
//   prepTime?: string;
// };

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");
  const [recipe, setRecipe] = useState(["empty"]);

  const parseRecipe = (newRecipe: any) => {
    if (Array.isArray(newRecipe)) {
      parseRecipe(newRecipe[0]);
    } else {
      // this is crucial!!!!
      setRecipe(newRecipe as any);
    }
  };
  console.log(Array.isArray(recipe));

  const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecipe = await getData(recipeURL);
    parseRecipe(newRecipe);
    setRecipeURL("");
  };

  return (
    <div className="pt-4">
      <form onSubmit={handleRecipeSubmit}>
        <input
          className="text-black w-1/2 rounded px-2"
          type="text"
          value={recipeURL}
          onChange={(e) => setRecipeURL(e.target.value)}
          placeholder="Recipe URL"
        />
        <button className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3">
          Enter Recipe
        </button>
      </form>
      {/* I DON'T LIKE THIS CONDITIONAL RENDERING... */}
      <div>{recipe.length !== 1 ? <RecipeCard recipe={recipe} /> : ""}</div>
    </div>
  );
}
