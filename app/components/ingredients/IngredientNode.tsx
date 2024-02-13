import { checkIngredient } from "../../../lib/checkIngredient";
import { useState } from "react";

type Ingredient = {
  id: number;
  name: string;
  ingredientId: number;
  checked: boolean;
};

const IngredientNode = ({ ingredient }: { ingredient: Ingredient }) => {
  const [isChecked, setIsChecked] = useState(ingredient.checked);
  // update the styling based on the 'checked' value
  // How to keep this in sync between client and db???
  const onCheckIngredient = async () => {
    setIsChecked(!isChecked);
    await checkIngredient(ingredient.id, isChecked);
  };

  return (
    <div className=" mx-4 pb-3">
      <li className="block mx-4 pb-3">
        <input
          onChange={() => onCheckIngredient()}
          className="mr-3"
          type="checkbox"
        ></input>
        <>{ingredient.name}</>
      </li>
    </div>
  );
};

export default IngredientNode;
