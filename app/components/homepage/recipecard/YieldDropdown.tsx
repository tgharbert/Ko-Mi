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
  // ingredients should be passed to this component...
  const handleAddIngredients = async (
    ingredients: string[],
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
        defaultValue={recipeYield}
      >
        <option value={recipeYield / 4}>{recipeYield / 4}</option>
        <option value={recipeYield / 2}>{recipeYield / 2}</option>
        <option value={recipeYield}>{recipeYield}</option>
        <option value={recipeYield * 1.5}>{recipeYield * 1.5}</option>
        <option value={recipeYield * 2}>{recipeYield * 2}</option>
      </select>
      <button
        onClick={() => handleAddIngredients(recipeIngredients, multiplier)}
      >
        Add Ingredients
      </button>
    </div>
  );
}
