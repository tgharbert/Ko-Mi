"use client";
import { useState, useEffect } from "react";
import IngredientNode from "./IngredientNode";
import LoadingPage from "../Loading";

type Ingredient = {
  name: string;
  ingredientId: number;
  checked: boolean;
};

const IngredientsList = () => {
  // get the userIngredients from the db
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIngredients = async () => {
    try {
      const userIngredients: Response = await fetch(
        "http://localhost:3000/api/ingredients",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const test = await userIngredients.json();
      setIngredients(test);
      setIsLoading(false);
      // return ingredients;
    } catch (error) {
      console.error(error);
      // should set an error message in the DOM
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleDeleteIngredients = async () => {
    try {
      await fetch("http://localhost:3000/api/ingredients", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getIngredients();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  // let ingredients = await getIngredients();

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="pb-8">
            <button className=" mr-4 bg-lime-500 px-3 rounded">
              Delete Checked
            </button>
            <button
              onClick={handleDeleteIngredients}
              className=" ml-4 bg-lime-500 px-3 rounded"
            >
              Delete All Items
            </button>
          </div>
          {/* SHOULD BE AN INFINITE SCROLL?? */}
          <div className="flex-col">
            <ul>
              {ingredients.map((ingredient: Ingredient) => {
                console.log("test");
                return (
                  <IngredientNode
                    key={ingredient.ingredientId}
                    ingredient={ingredient}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
