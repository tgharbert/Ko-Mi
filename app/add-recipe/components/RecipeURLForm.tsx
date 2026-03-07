"use client";
import RecipeCard from "./NewRecipeCard";
import { useState } from "react";
import getData from "../../../utils/scraper";
import getRecipeObject from "@/utils/parseRecipe";
import RecipeCardError from "./RecipeCardError";

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");
  const [recipe, setRecipe] = useState<RawRecipe | undefined>();
  const [badURL, setBadURL] = useState("");
  const [isError, setIsError] = useState(false);

  const isValidURL = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newRecipe = await getData(recipeURL);
      if (!newRecipe) {
        setError();
      }
      let recipeObject: RawRecipe | undefined = getRecipeObject(newRecipe);
      if (recipeObject === undefined) {
        setIsError(true);
        return;
      }
      recipeObject.url = recipeURL;
      // this is where I'm getting test data from
      // console.log("JSON: ", JSON.stringify(recipeObject));
      setBadURL("");
      setIsError(false);
      setRecipe(recipeObject);
      setRecipeURL("");
    } catch (err) {
      setError();
    }
  };

  const setError = () => {
    setIsError(true);
    setBadURL(recipeURL);
    setRecipeURL("");
    return;
  };

  return (
    <div>
      <form onSubmit={handleRecipeSubmit} className="flex items-center justify-center gap-2 max-w-lg mx-auto px-4">
        <input
          className="flex-1 rounded-md bg-primary/40 text-tertiary placeholder-tertiary/40 px-4 py-2 border border-white/10 focus:border-accent focus:outline-none"
          type="text"
          aria-label="Recipe URL"
          value={recipeURL}
          onChange={(e) => setRecipeURL(e.target.value)}
          placeholder="Recipe URL"
          autoFocus
        />
        <button
          disabled={!isValidURL(recipeURL)}
          className="bg-pop hover:bg-pop/80 text-tertiary rounded-md px-3 py-1.5 whitespace-nowrap transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Enter Recipe
        </button>
      </form>
      {isError ? (
        <RecipeCardError url={badURL} />
      ) : (
        <div>{recipe ? <RecipeCard recipe={recipe} /> : ""}</div>
      )}
    </div>
  );
}
