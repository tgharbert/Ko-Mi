"use client";
import { useState, useEffect } from "react";

const IngredientsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  // get the userIngredients from the db
  const getIngredients = async () => {
    try {
      const userIngredients: Response = await fetch("/api/ingredients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const ingredients = await userIngredients.json();
      setIngredients(ingredients);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // should set an error message in the DOM
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  // console.log(ingredients);
  return (
    <div>
      <h2>Your Current Shopping List:</h2>
      <ul>
        {ingredients.map((ingredient) => {
          // alter this to create 'nodes' for ingredients
          return <li key={ingredient.ingredientId}>{ingredient.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default IngredientsList;
