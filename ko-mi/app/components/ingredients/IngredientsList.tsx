"use client";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import IngredientNode from "./IngredientNode";

type Ingredient = {
  name: string;
  ingredientId: number;
};

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

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="pt-5">
            <p>Retrieving your ingredients...</p>
          </div>
          <Loading />
        </div>
      ) : (
        <div>
          <ul>
            {ingredients.map((ingredient: Ingredient) => {
              return (
                <IngredientNode
                  key={ingredient.ingredientId}
                  ingredient={ingredient}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
