"use client";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Ingredient = {
  id: number;
  name: string;
  locationId: number;
  recipeId: number;
  types: string[];
};

function IngredientAccordion({ ingredients }: { ingredients: Ingredient[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white text-black">
      <button
        onClick={() => setOpen(!open)}
        aria-controls="ingredients-content"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 font-semibold text-left"
      >
        Recipe Ingredients
        <ExpandMoreIcon
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id="ingredients-content"
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4">
          <ul className="list-disc text-left ml-2">
            {ingredients.map((ingredient, idx) => (
              <li className="pb-4" key={idx}>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default IngredientAccordion;
