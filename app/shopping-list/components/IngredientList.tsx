import { getUserIngredients } from "@/app/shopping-list/data/ingredients";
import IngredientListClient from "./IngredientListClient";

export default async function IngredientList({ id }: { id: string }) {
  const ingredients = await getUserIngredients(id);

  return <IngredientListClient initialData={ingredients ?? []} />;
}
