"use client";

import { memo, useCallback } from "react";
import IngredientNode from "./IngredientNode";
import { useIngredients } from "../hooks/useIngredients";

const MemoizedIngredientNode = memo(IngredientNode);

export default function IngredientListClient({
  initialData,
}: {
  initialData: IngredientWithLocation[];
}) {
  const { data, checkItem } = useIngredients(initialData);

  const onCheck = useCallback(
    (id: number, checked: boolean) => {
      checkItem.mutate({ id, checked });
    },
    [checkItem]
  );

  return (
    <div className="flex-col -mt-4 pt-6 pb-8">
      {data.map((ingredient: IngredientWithLocation) => (
        <MemoizedIngredientNode
          key={ingredient.id}
          ingredient={ingredient}
          onCheck={onCheck}
        />
      ))}
    </div>
  );
}
