// import { useState, useEffect } from "react";
import Loading from "../Loading";
import RecipeCard from "./recipecard/RecipeCardHome";

const RecipeList = async ({ id }: { id: string }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [recipes, setRecipes] = useState([]);

  // const getRecipes = async () => {
  //   try {
  //     const userRecipes: Response = await fetch("/api/get-recipes", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const newRecipes = await userRecipes.json();
  //     return newRecipes;
  //     // setRecipes(newRecipes);
  //     // setIsLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  console.log("id: ", id);

  const getRecipes = await fetch("http://localhost:3000/api/get-recipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // useEffect(() => {
  //   getRecipes();
  // }, []);

  let recipes = await getRecipes.json();

  // console.log("HHHHHEEEEEEYYYYYY", recipes);

  return (
    <div className="">
      {/* {isLoading ? (
        <div>
          <div className="pt-5">
            <p>Retrieving your recipes...</p>
          </div>
          <Loading />
        </div>
      ) : ( */}
      {/* // <div className=" w-full lg:max-w-full lg:flexbox sm:flexbox content-center"> */}
      <div className="grid sm:grid-cols-3 gap-4 sm:content-around ">
        {recipes.map((recipe: any) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
      {/* )} */}
    </div>
  );
};

export default RecipeList;
