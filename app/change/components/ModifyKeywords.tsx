"use client";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ModifyKeywords = ({ keywords }: { keywords: Keywords[] }) => {
  const [newKeywords, setNewKeywords] = useState<string[]>([]);

  console.log("on render: ", keywords);
  useEffect(() => {
    const justNames = keywords.map((ing) => ing.name);
    setNewKeywords(justNames);
  }, [keywords]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newKeys: string[] = [];
    newKeywords.forEach((keyword) => {
      newKeys.push(keyword);
    });
    // do db work...
    console.log(newKeys);
  };

  const onDelClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    const newArray = newKeywords.filter((_, index) => index !== idx);
    setNewKeywords(newArray);
  };

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newArray = [...newKeywords];
    newArray.push("");
    setNewKeywords(newArray);
  };

  return (
    <div className=" ">
      <form onSubmit={handleSubmit} name="ingredientForm">
        {newKeywords.map((ingredient: string, idx: number) => (
          <div className="" key={idx}>
            <div className="flex justify-center item-center">
              <input
                name={`ingredient-${idx}`}
                className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-48 text-center"
                value={ingredient}
                onChange={(e) => {
                  const updatedIngredients = [...newKeywords];
                  updatedIngredients[idx] = e.target.value;
                  setNewKeywords(updatedIngredients);
                }}
              />
              <button
                onClick={(e) => onDelClick(e, idx)}
                className=" text-red-700"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
        <div>
          <button onClick={(e) => onAddClick(e)} className="text-green-600">
            <AddIcon />
          </button>
        </div>
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

export default ModifyKeywords;
