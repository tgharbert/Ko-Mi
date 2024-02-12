// import RecipeSearchBar from "./SearchBar";
import RecipeCard from "./recipecard/RecipeCardHome";
import { getRecipes } from "@/lib/getRecipes";

const RecipeList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  // modify this for the query term and the page = also need to handle pagination
  // const fetchRecipes = async (query: string, page: number) => {
  //   const response = await fetch(
  //     `http://localhost:3000/api/get-recipes/${query}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       cache: "no-store",
  //     }
  //   );
  //   const data = await response.json();
  //   return data;
  // };

  let test = await getRecipes(query, "");
  let recipes = await test.json();
  // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", test);

  // let recipes = await fetchRecipes(query, currentPage);

  return (
    <div className="">
      {/* <RecipeSearchBar /> */}
      <div className="grid sm:grid-cols-3 gap-4 sm:content-around ">
        {recipes.map((recipe: any) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default RecipeList;
