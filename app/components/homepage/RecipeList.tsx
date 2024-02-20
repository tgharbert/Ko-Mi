import RecipeCard from "./recipecard/RecipeCardHome";
import PageNavigation from "./PageNavigation";
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
  // current page will get passed in here to add pagination
  let response = await getRecipes(query, category, currentPage);
  let recipes = await response?.json();

  return (
    <div>
      <div className="sm:flex justify-center items-center pb-8">
        <div className="grid sm:grid-cols-3 gap-2 w-4/5">
          {recipes.map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
      {recipes.length === 0 ? (
        <div>
          <p>Temp Error Message: Sorry, no recipes!</p>
        </div>
      ) : (
        <div className="float-center">
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
