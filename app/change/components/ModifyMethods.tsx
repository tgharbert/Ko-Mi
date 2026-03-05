"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import updateMethods from "../data/updateMethod";
import PrimaryButton from "@/app/components/PrimaryButton";

const ModifyMethods = ({ id, methods }: { id: number; methods: string[] }) => {
  const [newMethods, setNewMethods] = useState<string[]>([]);

  useEffect(() => {
    const justNames = methods.map((ing) => ing);
    setNewMethods(justNames);
  }, [methods]);

  const handleSubmit = (e: React.MouseEvent) => {
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
    <div>
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
              <Trash2 size={20} />
            </button>
          </div>
          <button onClick={(e) => onAddClick(e, idx)} className="text-accent">
            <Plus size={20} />
          </button>
        </div>
      ))}
      <PrimaryButton onClick={handleSubmit}>Update Methods</PrimaryButton>
    </div>
  );
};

export default ModifyMethods;
