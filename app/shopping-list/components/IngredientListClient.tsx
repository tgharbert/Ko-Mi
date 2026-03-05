"use client";

import IngredientNode from "./IngredientNode";
import { useIngredients } from "../hooks/useIngredients";

export default function IngredientListClient({
  initialData,
}: {
  initialData: IngredientWithLocation[];
}) {
  const { data, checkItem } = useIngredients(initialData);

  const onCheck = (id: number, checked: boolean) => {
    checkItem.mutate({ id, checked });
  };

  return (
    <div className="flex-col -mt-4">
      {data.map((ingredient: IngredientWithLocation) => (
        <IngredientNode
          key={ingredient.id}
          ingredient={ingredient}
          onCheck={onCheck}
        />
      ))}
    </div>
  );
}
