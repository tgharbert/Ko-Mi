"use client";

import { checkIngredient } from "../data/checkIngredient";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function IngredientNode({
  ingredient,
}: {
  ingredient: IngredientWithLocation;
}) {
  const [isChecked, setIsChecked] = useState(ingredient.checked);

  const onCheckIngredient = async () => {
    setIsChecked(!isChecked);
    await checkIngredient(ingredient.id, isChecked);
  };

  return (
    <span className="sm:flex sm:items-center sm:justify-center ">
      <div className=" overflow-y-auto mx-4 px-4  border-2 sm:w-2/5 border-black rounded-lg h-auto mt-4 bg-tertiary text-black ">
        <span
          className={
            isChecked
              ? "w-full line-through text-lg text-red-500"
              : "w-full text-lg"
          }
        >
          <span className="mt-4 mb-4 flex ">
            <IconButton
              onClick={() => onCheckIngredient()}
              className=""
              aria-label="check item"
            >
              {isChecked ? (
                <RemoveShoppingCartIcon className=" text-red-500 " />
              ) : (
                <AddShoppingCartIcon className=" text-lime-500 " />
              )}
            </IconButton>
            <p className="pl-2 content-center text-left pr-4">
              {ingredient.name}
            </p>
          </span>
        </span>
        {ingredient.location === "other" || !ingredient.location ? (
          <></>
        ) : (
          <p className="text-primary italic flex justify-end -mt-4">
            {ingredient.location}
          </p>
        )}
      </div>
    </span>
  );
}

export default IngredientNode;
