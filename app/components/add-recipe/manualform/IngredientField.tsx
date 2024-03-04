import { useState } from "react";

const IngredientField = ({
  ingredient,
  ingredientChange,
}: {
  ingredient: string;
  ingredientChange: Function;
}) => {
  return (
    <div>
      <textarea
        className="text-black rounded px-4 pt-1 pb-1 "
        placeholder="Enter Ingredient"
        value={ingredient}
        onChange={(e) => ingredientChange(e)}
      />
    </div>
  );
};

export default IngredientField;
