"use client";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import getData from "../../../utils/scraper";
import getRecipeObject from "@/utils/parseRecipe";
import RecipeCardError from "./RecipeCardError";

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");
  const [recipe, setRecipe] = useState({});
  const [badURL, setBadURL] = useState("");
  const [isRecipe, setIsRecipe] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecipe = await getData(recipeURL);
    if (!newRecipe) {
      setIsError(true);
      setBadURL(recipeURL);
      setRecipeURL("");
      return;
    }
    let recipeObject = getRecipeObject(newRecipe);
    recipeObject.url = recipeURL;
    setBadURL("");
    setIsError(false);
    setRecipe(recipeObject);
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
      {isError ? (
        <RecipeCardError url={badURL} />
      ) : (
        <div>{isRecipe ? <RecipeCard recipe={recipe} /> : ""}</div>
      )}
    </div>
  );
}
