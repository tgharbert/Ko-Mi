"use server";
import ModifyIngredients from "./ModifyIngredients";
import ModifyNameAndPhoto from "./ModifyNameAndPhoto";
import ModifyMethods from "./ModifyMethods";
import ModifyKeywords from "./ModifyKeywords";
import ModifyDetails from "./ModifyDetails";
import { revalidatePath } from "next/cache";

const ModifyRecipeForm = async ({ recipe }: { recipe: Recipe }) => {
  const revalidate = async () => {
    "use server";
    revalidatePath(`/change/${recipe.id}`);
  };

  return (
    <div className="flexbox mr-8 ml-8 sm:mr-20 sm:ml-20 ">
      <ModifyNameAndPhoto recipe={recipe} revalidate={revalidate} />

      <div className="flex justify-center ">
        <div className="sm:w-2/5 w-full">
          <details className="rounded-lg border border-gray-200 bg-white text-black">
            <summary className="px-4 py-3 font-semibold cursor-pointer">
              Recipe Details
            </summary>
            <div className="px-4 pb-4">
              <ModifyDetails
                id={recipe.id}
                description={recipe.description}
                recipeYield={recipe.recipeYield}
                time={recipe.cookTime}
              />
            </div>
          </details>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="sm:w-2/5 w-full">
          <details className="rounded-lg border border-gray-200 bg-white text-black">
            <summary className="px-4 py-3 font-semibold cursor-pointer">
              Recipe Ingredients
            </summary>
            <div className="px-4 pb-4">
              <ModifyIngredients
                id={recipe.id}
                ingredients={recipe.ingredients}
              />
            </div>
          </details>
        </div>
      </div>

      <div className="flex justify-center ">
        <div className="sm:w-2/5 w-full">
          <details className="rounded-lg border border-gray-200 bg-white text-black">
            <summary className="px-4 py-3 font-semibold cursor-pointer">
              Recipe Method
            </summary>
            <div className="px-4 pb-4">
              <ModifyMethods id={recipe.id} methods={recipe.instructions} />
            </div>
          </details>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="sm:w-2/5 w-full">
          <details className="rounded-lg border border-gray-200 bg-white text-black">
            <summary className="px-4 py-3 font-semibold cursor-pointer">
              Recipe Keywords
            </summary>
            <div className="px-4 pb-4">
              <ModifyKeywords id={recipe.id} keywords={recipe.keywords} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ModifyRecipeForm;
