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
    <span className="sm:flex sm:items-center sm:justify-center ">
      <li className="flexbox overflow-y-auto mx-4 px-4 text-left border-2 sm:w-2/5 border-black rounded-lg h-auto mt-4 bg-tertiary text-black">
        <p
          className={
            isChecked
              ? "w-full float-center line-through text-lg text-red-500"
              : "w-full float-center text-lg "
          }
        >
          <span className="mt-4 mb-4 flex">
            <IconButton onClick={() => onCheckIngredient()} className="">
              {isChecked ? (
                <RemoveShoppingCartIcon className=" text-red-500 text-left" />
              ) : (
                <AddShoppingCartIcon className=" text-lime-500 float-left " />
              )}
            </IconButton>
            <div className="px-20">{ingredient.name}</div>
          </span>
        </p>
      </li>
    </span>
  );
};

export default IngredientNode;
