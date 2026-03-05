"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import updateIngredients from "../data/updateIngredients";
import PrimaryButton from "@/app/components/PrimaryButton";

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    let newIngs: string[] = [];
    newIngredients.forEach((ingredient) => {
      if (ingredient.replace(/ /g, "") !== "") newIngs.push(ingredient);
    });
    updateIngredients(id, newIngs);
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
      {newIngredients.map((ingredient: string, idx: number) => (
        <div className="" key={idx}>
          <div className="flex justify-center item-center">
            <textarea
              name={`ingredient-${idx}`}
              className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full"
              value={ingredient}
              onChange={(e) => {
                const updatedIngredients = [...newIngredients];
                updatedIngredients[idx] = e.target.value;
                setNewIngredients(updatedIngredients);
              }}
            />
            <button
              onClick={(e) => onDelClick(e, idx)}
              className="text-red-500"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <button onClick={(e) => onAddClick(e, idx)} className="text-accent">
            <Plus size={20} />
          </button>
        </div>
      ))}
      <PrimaryButton onClick={handleSubmit}>Update Ingredients</PrimaryButton>
    </div>
  );
};

export default ModifyIngredients;
