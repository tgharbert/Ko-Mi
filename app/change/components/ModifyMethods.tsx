"use client";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import updateMethods from "../data/updateMethod";

const ModifyMethods = ({ id, methods }: { id: number; methods: string[] }) => {
  const [newMethods, setNewMethods] = useState<string[]>([]);

  useEffect(() => {
    const justNames = methods.map((ing) => ing);
    setNewMethods(justNames);
  }, [methods]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let methodValues: string[] = [];
    newMethods.forEach((method) => {
      if (method.replace(/ /g, "") !== "") methodValues.push(method);
    });
    updateMethods(id, methodValues);
  };

  const onDelClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    const newArray = newMethods.filter((_, index) => index !== idx);
    setNewMethods(newArray);
  };

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    let newArray = [...newMethods];
    newArray.splice(idx + 1, 0, "");
    setNewMethods(newArray);
  };

  return (
    <div className=" ">
      <form onSubmit={handleSubmit} name="ingredientForm">
        {newMethods.map((ingredient: string, idx: number) => (
          <div className="" key={idx}>
            <div className="flex justify-center item-center">
              <textarea
                name={`ingredient-${idx}`}
                className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2  border-primary w-full sm:w-96 h-24"
                value={ingredient}
                onChange={(e) => {
                  const updatedMethods = [...newMethods];
                  updatedMethods[idx] = e.target.value;
                  setNewMethods(updatedMethods);
                }}
              />
              <button
                onClick={(e) => onDelClick(e, idx)}
                className=" text-red-500"
              >
                <DeleteIcon />
              </button>
            </div>
            <button
              onClick={(e) => onAddClick(e, idx)}
              className="text-lime-500"
            >
              <AddIcon />
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4 text-white"
        >
          Update Methods
        </button>
      </form>
    </div>
  );
};

export default ModifyMethods;
