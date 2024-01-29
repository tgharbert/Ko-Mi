"use client";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import getData from "../../utils/scraper";
import getRecipeObject from "@/utils/parseRecipe";

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
  const [recipe, setRecipe] = useState({});
  const [isRecipe, setIsRecipe] = useState(false);

  const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecipe = await getData(recipeURL);
    if (!newRecipe) {
      // error message
      alert("invalid recipe!");
      setRecipeURL("");
      return;
    }
    setRecipe(getRecipeObject(newRecipe));
    setIsRecipe(true);
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
      <div>{isRecipe ? <RecipeCard recipe={recipe} /> : ""}</div>
    </div>
  );
}
