import { useState } from "react";
import { addIngredients } from "@/lib/addIngredients";

export default function YieldDropdown({
  recipeYield,
  recipeIngredients,
  handleClose,
}: {
  recipeYield: number;
  recipeIngredients: Ingredient[];
  handleClose: Function;
}) {
  const [multiplier, setMultiplier] = useState(recipeYield);

  const handleAddIngredients = async (
    ingredients: Ingredient[],
    multiplier: number
  ) => {
    addIngredients(ingredients, multiplier);
    handleClose();
  };

  // on click the ingredients are sent to the db where the multiplier will be applied...
  return (
    <div className="pb-4">
      <select
        // value={multiplier}
        onChange={(e) => setMultiplier(e.target.value)}
        defaultValue={1}
      >
        <option value={0.25}>{recipeYield / 4}</option>
        <option value={0.5}>{recipeYield / 2}</option>
        <option value={1}>{recipeYield}</option>
        <option value={1.5}>{recipeYield * 1.5}</option>
        <option value={2}>{recipeYield * 2}</option>
      </select>
      <button
        onClick={() => handleAddIngredients(recipeIngredients, multiplier)}
      >
        Add Ingredients
      </button>
    </div>
  );
}
