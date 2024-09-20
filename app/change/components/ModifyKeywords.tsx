"use client";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import updateKeywords from "../data/updateKeywords";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import theme from "@/mui-styles/styles";

const ModifyKeywords = ({
  id,
  keywords,
}: {
  id: number;
  keywords: Keywords[];
}) => {
  const [newKeywords, setNewKeywords] = useState<string[]>([]);

  useEffect(() => {
    const justNames = keywords.map((ing) => ing.name);
    setNewKeywords(justNames);
  }, [keywords]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    let newKeys: string[] = [];
    newKeywords.forEach((keyword) => {
      // cover for emtpy values
      if (keyword.replace(/ /g, "") !== "") newKeys.push(keyword);
    });
    updateKeywords(id, newKeys);
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
    <ThemeProvider theme={theme}>
      {newKeywords.map((keyword: string, idx: number) => (
        <div className="" key={idx}>
          <div className="flex justify-center item-center pl-6">
            <input
              name={`ingredient-${idx}`}
              className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-48 text-center"
              value={keyword}
              onChange={(e) => {
                const updatedKeywords = [...newKeywords];
                updatedKeywords[idx] = e.target.value;
                setNewKeywords(updatedKeywords);
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
      <Button
        className="bg-lime-500 px-4"
        variant="contained"
        color="lime"
        onClick={handleSubmit}
      >
        Update Ingredients
      </Button>
    </ThemeProvider>
  );
};

export default ModifyKeywords;
