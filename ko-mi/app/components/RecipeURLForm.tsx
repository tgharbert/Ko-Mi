"use client";
import { useState } from "react";
import getData from "../add-recipe/scraper";

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");
  const [recipe, setRecipe] = useState([]);

  const parseRecipe = (newRecipe: any) => {
    if (Array.isArray(newRecipe)) {
      console.log("good test");
      parseRecipe(newRecipe[0]);
    } else {
      setRecipe(newRecipe as any);
    }
  };

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
          Enter Recipe
        </button>
      </form>
      {recipe ? (
        <div>{JSON.stringify(recipe.recipeIngredient)}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
