import RecipeCard from "./recipecard/RecipeCardHome";
import PageNavigation from "./PageNavigation";
import { getRecipes } from "@/lib/getRecipes";

const RecipeList = async ({
  query,
  currentPage,
  category,
  random,
}: {
  query: string;
  currentPage: number;
  category: string;
  random: string;
}) => {
  let response = await getRecipes(query, category, currentPage, random);
  let recipes = await response?.json();

  return (
    <div>
      <div className="sm:flex justify-center items-center pb-8">
        <div className="grid sm:grid-cols-3 gap-2 sm:w-4/5 ">
          {recipes.map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
      {recipes.length === 0 ? (
        <div className=" bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 ">
          <p>Sorry, no recipes match with &apos;{query}&apos;!</p>
        </div>
      ) : (
        <div className="float-center justify">
          <PageNavigation
            currentPage={currentPage}
            numberOfResults={recipes.length}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
