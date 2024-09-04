"use client";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import updateIngredients from "../data/updateIngredients";

const ModifyIngredients = ({
  id,
  ingredients,
}: {
  id: number;
  ingredients: Ingredient[];
}) => {
  const [newIngredients, setNewIngredients] = useState<string[]>([]);

  useEffect(() => {
    const justNames = ingredients.map((ing) => ing.name);
    setNewIngredients(justNames);
  }, [ingredients]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newIngs: string[] = [];
    newIngredients.forEach((ingredient) => {
      newIngs.push(ingredient);
    });
    // do db work...
    updateIngredients(id, newIngs);
    console.log(newIngs);
  };

  const onDelClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    const newArray = newIngredients.filter((_, index) => index !== idx);
    setNewIngredients(newArray);
  };

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    let newArray = [...newIngredients];
    newArray.splice(idx + 1, 0, "");
    setNewIngredients(newArray);
  };

  return (
    <div className="overflow-auto ">
      <form onSubmit={handleSubmit} name="ingredientForm">
        {newIngredients.map((ingredient: string, idx: number) => (
          <div className="" key={idx}>
            <div className="flex justify-center item-center">
              <textarea
                name={`ingredient-${idx}`}
                className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
                value={ingredient}
                onChange={(e) => {
                  const updatedIngredients = [...newIngredients];
                  updatedIngredients[idx] = e.target.value;
                  setNewIngredients(updatedIngredients);
                }}
              />
              <button
                onClick={(e) => onDelClick(e, idx)}
                className="text-red-700"
              >
                <DeleteIcon />
              </button>
            </div>
            <button
              onClick={(e) => onAddClick(e, idx)}
              className="text-green-600"
            >
              <AddIcon />
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4 text-white"
        >
          Update Ingredients
        </button>
      </form>
    </div>
  );
};

export default ModifyIngredients;
