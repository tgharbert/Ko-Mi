"use client";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import RecipeCard from "./RecipeCardHome";

const RecipeList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const userRecipes: Response = await fetch("/api/get-recipes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newRecipes = await userRecipes.json();
      setRecipes(newRecipes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="pt-5">
            <p>Retrieving your recipes...</p>
          </div>
          <Loading />
        </div>
      ) : (
        <div>
          {/* {recipes.map((recipe) => {
            return recipe.name;
          })} */}
          {recipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
