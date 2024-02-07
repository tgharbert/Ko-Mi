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

  console.log(ingredients);
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default IngredientsList;
