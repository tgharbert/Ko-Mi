"use client";
import { useState } from "react";

export default function RecipeURLForm() {
  const [recipeURL, setRecipeURL] = useState("");

  return (
    <div>
      <form>
        <input
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
