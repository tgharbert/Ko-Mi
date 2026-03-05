"use client";

import { ShoppingCart } from "lucide-react";

function IngredientNode({
  ingredient,
  onCheck,
}: {
  ingredient: IngredientWithLocation;
  onCheck: (id: number, checked: boolean) => void;
}) {
  return (
    <div className="flex justify-center">
      <div className={`mt-2 mb-2 max-w-[345px] min-w-[345px] rounded-xl shadow-md animate-slide-up transition-all duration-200 ${ingredient.checked ? "opacity-60" : "opacity-100"}`}>
        <div className="bg-card text-tertiary rounded-xl px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => onCheck(ingredient.id, !ingredient.checked)}
              aria-label="check item"
              className="p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150"
            >
              {ingredient.checked ? (
                <ShoppingCart className="text-red-500" size={22} />
              ) : (
                <ShoppingCart className="text-accent" size={22} />
              )}
            </button>
            <p className={`pl-2 text-left flex-1 ${ingredient.checked ? "line-through text-red-500" : ""}`}>
              {ingredient.name}
            </p>
          </div>
          {ingredient.location && ingredient.location !== "other" && (
            <p className="text-tertiary/50 italic text-sm text-right -mt-1">
              {ingredient.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default IngredientNode;
