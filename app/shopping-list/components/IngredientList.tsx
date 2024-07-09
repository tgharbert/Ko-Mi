import IngredientNode from "./IngredientNode";
import { getUserIngredients } from "@/lib/ingredients";
import { Suspense } from "react";
import Loading from "../loading";

export default async function IngredientList() {
  let ingredients: IngredientWithLocation[] | undefined =
    await getUserIngredients();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex-col -mt-4">
        {ingredients?.map((ingredient: IngredientWithLocation) => {
          return <IngredientNode key={ingredient.id} ingredient={ingredient} />;
        })}
      </div>
    </Suspense>
  );
}
