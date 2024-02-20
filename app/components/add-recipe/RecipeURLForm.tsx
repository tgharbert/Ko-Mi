"use client";
import RecipeCard from "./NewRecipeCard";
import { useState } from "react";
import getData from "../../../utils/scraper";
import getRecipeObject from "@/utils/parseRecipe";
import RecipeCardError from "./RecipeCardError";
import LinkIcon from "@mui/icons-material/Link";

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");
  const [recipe, setRecipe] = useState<RawRecipe | undefined>();
  const [badURL, setBadURL] = useState("");
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
    let recipeObject: RawRecipe = getRecipeObject(newRecipe);
    recipeObject.url = recipeURL;
    setBadURL("");
    setIsError(false);
    setRecipe(recipeObject);
    setRecipeURL("");
  };

  return (
    <div className="">
      <form onSubmit={handleRecipeSubmit}>
        <input
          className="text-black w-1/2 rounded px-4 pt-1 pb-1 "
          type="text"
          value={recipeURL}
          onChange={(e) => setRecipeURL(e.target.value)}
          placeholder="Recipe URL"
          autoFocus
        />
        <button className="bg-lime-500 hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
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
