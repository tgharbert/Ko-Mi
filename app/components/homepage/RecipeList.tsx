import RecipeCard from "./recipecard/RecipeCardHome";
import { getRecipes } from "@/lib/getRecipes";

const RecipeList = async ({
  query,
  currentPage,
  category,
}: {
  query: string;
  currentPage: number;
  category: string;
}) => {
  // query for recipes
  let response = await getRecipes(query, category);
  let recipes = await response?.json();

  return (
    <div className="">
      <div className="grid sm:grid-cols-3 gap-4 sm:content-around ">
        {recipes.map((recipe: any) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default RecipeList;
