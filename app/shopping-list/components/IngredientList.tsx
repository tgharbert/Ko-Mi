"use server";
import IngredientNode from "./IngredientNode";
import { getUserIngredients } from "@/app/shopping-list/data/ingredients";

export default async function IngredientList({ id }: { id: string }) {
  let ingredients: IngredientWithLocation[] | undefined =
    await getUserIngredients(id);

  return (
    <div className="flex-col -mt-4">
      {ingredients?.map((ingredient: IngredientWithLocation) => {
        return <IngredientNode key={ingredient.id} ingredient={ingredient} />;
      })}
    </div>
  );
}
