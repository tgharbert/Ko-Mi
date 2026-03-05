"use client";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function IngredientNode({
  ingredient,
  onCheck,
}: {
  ingredient: IngredientWithLocation;
  onCheck: (id: number, checked: boolean) => void;
}) {
  return (
    <span className="sm:flex sm:items-center sm:justify-center ">
      <div className=" overflow-y-auto mx-4 px-4  border-2 sm:w-2/5 border-black rounded-lg h-auto mt-4 bg-tertiary text-black ">
        <span
          className={
            ingredient.checked
              ? "w-full line-through text-lg text-red-500"
              : "w-full text-lg"
          }
        >
          <span className="mt-4 mb-4 flex ">
            <button
              onClick={() => onCheck(ingredient.id, !ingredient.checked)}
              aria-label="check item"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {ingredient.checked ? (
                <RemoveShoppingCartIcon className=" text-red-500 " />
              ) : (
                <AddShoppingCartIcon className=" text-lime-500 " />
              )}
            </button>
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
