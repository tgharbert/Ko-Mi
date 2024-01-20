"use client";
import { useState } from "react";
import getData from "../add-recipe/scraper";

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("recipeURL", recipeURL);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          value={recipeURL}
          onChange={(e) => setRecipeURL(e.target.value)}
          placeholder="Recipe URL"
        />
        <button>Enter Recipe</button>
      </form>
    </div>
  );
}
