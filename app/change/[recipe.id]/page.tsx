"use server";
import verifyUser from "@/utils/verifyUser";
import Header from "@/app/components/Header";
import getRecipe from "@/app/change/data/getRecipe";
import UnableToModify from "../components/UnableToModify";
import ModifyRecipeForm from "../components/ModifyRecipeForm";

export default async function ChangeRecipe(props: {
  params: Promise<{ "recipe.id": number }>;
}) {
  const params = await props.params;
  const user = await verifyUser();
  let recipeId: number = params["recipe.id"];

  let response = await getRecipe(recipeId);
  let recipe: Recipe = await response?.json();

  return (
    <div className="text-center flexbox content-center pb-8">
      <div className="-mt-12">
        <Header />
      </div>
      {user?.name !== recipe.author ? (
        <UnableToModify name={recipe.name} />
      ) : (
        <ModifyRecipeForm recipe={recipe} />
      )}
    </div>
  );
}
