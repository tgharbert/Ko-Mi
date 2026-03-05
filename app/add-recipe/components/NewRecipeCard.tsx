import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import { useState } from "react";
import InstructionAccordion from "@/app/components/accordions/InstructionAccordion";
import DescriptionAccordion from "@/app/components/accordions/DescriptionAccordion";
import { addRecipe } from "@/app/add-recipe/data/addRecipe";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "@/app/components/PrimaryButton";
function RecipeCard({ recipe }: { recipe: RawRecipe }) {
  const [isLoading, setIsLoading] = useState(false);

  const he = require("he");
  const router = useRouter();

  const handleRecipeSubmission = async () => {
    try {
      await addRecipe(recipe);
      setIsLoading(true);
      router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="mr-8 ml-8 sm:mr-20 sm:ml-20 flexbox">
      <div>
        <h1 className="text-xl pt-4 font-semi-bold">{recipe.name}</h1>
      </div>
      <div>
        <p className="text-sm pt-2 italic">by: {recipe.author}</p>
      </div>
      <div className="pt-4 pb-4 flex items-center justify-center">
        <Image
          width="400"
          height="400"
          src={recipe.image}
          alt="recipe-photo"
          className="rounded-lg"
        />
      </div>
      <div className="mt-2">
        <PrimaryButton onClick={handleRecipeSubmission}>
          Add Recipe
          <AddIcon className="pl-1" />
        </PrimaryButton>
      </div>
      {recipe.description ? (
        <div className="flex justify-center">
          <div className="mt-4 rounded-lg sm:w-3/5">
            <DescriptionAccordion description={recipe.description} />
          </div>
        </div>
      ) : (
        <div className="mt-4"></div>
      )}
      <div className="flex justify-center">
        <div className="sm:w-3/5">
          <details className="rounded-lg border border-gray-200 bg-white text-black">
            <summary className="px-4 py-3 font-semibold cursor-pointer">
              Recipe Ingredients
            </summary>
            <div className="px-4 pb-4">
              <ul className="px-2 list-disc text-left">
                {recipe.recipeIngredient.map((ingredient, idx: number) => (
                  <li className="pb-4" key={idx}>
                    {he.decode(ingredient)}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="rounded-lg sm:w-3/5">
          <InstructionAccordion instructions={recipe.instructions} />
        </div>
      </div>
      <div className="mx-4 pt-7 pb-10"></div>
    </div>
  );
}

export default RecipeCard;
