import { checkIngredient } from "../../../lib/checkIngredient";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
    // <div className=" mx-4 pb-3 float-left block">
    <span className="">
      <li className="flexbox overflow-y-auto mx-4 pb-8 text-left border-2 border-red rounded-lg h-auto mt-4">
        <IconButton onClick={() => onCheckIngredient()} className="mr-3 ">
          {isChecked ? (
            <RemoveShoppingCartIcon className="mt-4 text-red-500  ml-4" />
          ) : (
            <AddShoppingCartIcon className="mt-4 text-lime-500 ml-4" />
          )}
        </IconButton>
        <p
          className={
            isChecked
              ? "w-4/5 float-right line-through text-lg pt-4  text-red-500"
              : "w-4/5 float-right text-lg pt-4"
          }
        >
          {ingredient.name}
        </p>
      </li>
    </span>
    // </div>
  );
};

export default IngredientNode;
