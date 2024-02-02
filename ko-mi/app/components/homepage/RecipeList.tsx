"use client";
import { useState, useEffect } from "react";
import Loading from "../Loading";

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
          {recipes.map((recipe) => {
            return recipe.name;
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
