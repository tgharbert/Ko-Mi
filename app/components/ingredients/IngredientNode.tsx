import { checkIngredient } from "../../../lib/checkIngredient";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const IngredientNode = ({ ingredient }: { ingredient: Ingredient }) => {
  const [isChecked, setIsChecked] = useState(ingredient.checked);

  const onCheckIngredient = async () => {
    setIsChecked(!isChecked);
    await checkIngredient(ingredient.id, isChecked);
  };

  return (
    // <div className=" mx-4 pb-3 float-left block">
    <span className="sm:flex sm:items-center sm:justify-center ">
      <li className="flexbox overflow-y-auto mx-4 pb-8 text-left border-2 sm:w-2/5 border-black rounded-lg h-auto mt-4 bg-tertiary text-black">
        <IconButton onClick={() => onCheckIngredient()}>
          {isChecked ? (
            <RemoveShoppingCartIcon className="mt-4 text-red-500  ml-4 text-left" />
          ) : (
            <AddShoppingCartIcon className="mt-4 text-lime-500 ml-4 float-left" />
          )}
        </IconButton>
        <p
          className={
            isChecked
              ? "w-4/5 float-right line-through text-lg pt-4 text-red-500"
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
