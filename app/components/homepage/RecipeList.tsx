import RecipeCard from "./recipecard/RecipeCardHome";
import { getRecipes } from "@/lib/getRecipes";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  let response = await getRecipes(query, category);
  let recipes = await response?.json();

  // clicking a button at the bottom will increment the page, if there are more results that aren't shown
  // this button will be a client component that is created and imported into the bottom of the page
  // currentPage will passed into it
  // const handleNextPageClick = (currentPage: number) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("page", page++);
  //   replace(`${pathname}?${params.toString()}`);
  // };

  return (
    <div className="sm:flex justify-center items-center pb-8">
      <div className="grid sm:grid-cols-3 gap-2 w-4/5">
        {recipes.map((recipe: any) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default RecipeList;
