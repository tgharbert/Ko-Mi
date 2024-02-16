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
      <li className="flexbox overflow-y-auto mx-4 px-4 text-left border-2 sm:w-2/5 border-black rounded-lg h-auto mt-4 bg-tertiary text-black">
        {/* <span className="mt-6 flex w-1/5">
          <IconButton
            onClick={() => onCheckIngredient()}
            className="justify-center content-center flex"
          >
            {isChecked ? (
              <RemoveShoppingCartIcon className=" text-red-500 text-left flex justify-center content-center" />
            ) : (
              <AddShoppingCartIcon className=" text-lime-500 float-left" />
            )}
          </IconButton>
        </span> */}
        <p
          className={
            isChecked
              ? "w-full float-center line-through text-lg text-red-500"
              : "w-full float-center text-lg "
          }
        >
          <span className="mt-4 mb-4 flex ">
            <IconButton
              onClick={() => onCheckIngredient()}
              className="justify-center content-center flex"
            >
              {isChecked ? (
                <RemoveShoppingCartIcon className=" text-red-500 text-left flex justify-center content-center mr-4" />
              ) : (
                <AddShoppingCartIcon className=" text-lime-500 float-left mr-4" />
              )}
            </IconButton>
            <div>{ingredient.name}</div>
          </span>
        </p>
      </li>
    </span>
    // </div>
  );
};

export default IngredientNode;
