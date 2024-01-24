"use client";
import { useState } from "react";
import getData from "../add-recipe/scraper";
// this is how I will send data to the new page - (new-recipe)
import Link from "next/link";

type Recipe = {
  title: string;
  author: string;
  description: string;
  name: string;
  keywords: string[];
  instructions: string[];
  image: string[];
  aggregateRating: number;
  cuisine: string;
  publisher: string;
  recipeYield: number;
  mainEntityOfPage: boolean;
  totalTime: string;
  cookTime: string;
  prepTime: string;
};

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");
  const [recipe, setRecipe] = useState([]);

  // should this happen on the new-recipe page?
  // currently we leave the page before the parsing is finished
  const parseRecipe = (newRecipe: any) => {
    if (Array.isArray(newRecipe)) {
      console.log("good test");
      parseRecipe(newRecipe[0]);
    } else {
      setRecipe(newRecipe as any);
    }
  };

  // ONE WAY TO DO THIS IS TO SIMPLY PASS THE URL TO THE NEW-RECIPE PAGE
  // THEN HAVE ALL OF THIS WORK DONE ON THAT PAGE...

  const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecipe = await getData(recipeURL);
    parseRecipe(newRecipe);
    // send the recipe to the database...
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
          {/* Enter Recipe */}
          {/* send the recipe data here */}
          <Link
            href={{
              pathname: "/new-recipe",
              query: { search: recipeURL },
            }}
          >
            Enter Recipe
          </Link>
        </button>
      </form>
      {recipe ? (
        <div>Here is some data: {JSON.stringify(recipe.recipeIngredient)}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
