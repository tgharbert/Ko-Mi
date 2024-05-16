"use client";
import RecipeCard from "./recipecard/RecipeCardHome";
import PageNavigation from "./PageNavigation";
// import { getRecipes } from "@/lib/getRecipes";
import { useState, useEffect, useCallback } from "react";
import LoadingPage from "@/app/loading";

function RecipeList({
  query,
  currentPage,
  category,
  random,
  all,
  getUserRecipes,
}: {
  query: string;
  currentPage: number;
  category: string;
  random: string;
  all: string;
  getUserRecipes: Function;
}) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndRecipes, setIsEndRecipes] = useState(false);

  // let getRecipes = async () => {
  //   setRecipes([]);
  //   let userRecipes = await getUserRecipes();
  //   if (userRecipes.length === 0) {
  //     setIsEndRecipes(true);
  //   }
  //   setRecipes(userRecipes);
  // };

  const getRecipes = useCallback(async () => {
    setRecipes([]);
    let userRecipes = await getUserRecipes();
    if (userRecipes.length === 0) {
      setIsEndRecipes(true);
    }
    setRecipes(userRecipes);
    setIsLoading(false);
  }, [getUserRecipes]);

  useEffect(() => {
    getRecipes();
  }, [query, currentPage, category, random, all, getRecipes]);

  return (
    <div>
      {!recipes.length ? (
        <LoadingPage />
      ) : (
        <div className="sm:flex justify-center items-center pb-8">
          <div className="grid sm:grid-cols-3 gap-2 sm:w-4/5 ">
            {recipes.map((recipe: Recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </div>
      )}
      {isEndRecipes ? (
        <div className=" bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 ">
          <p>Sorry, no recipes match with &apos;{query}&apos;!</p>
        </div>
      ) : (
        // <div className="float-center justify">
        //   <PageNavigation
        //     currentPage={currentPage}
        //     numberOfResults={recipes.length}
        //   />
        // </div>
        // infinite scroll?
        <></>
      )}
    </div>
  );
}

export default RecipeList;
