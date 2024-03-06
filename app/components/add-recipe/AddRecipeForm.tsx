"use client";
import RecipeURLForm from "./RecipeURLForm";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import ManualForm from "./manualform/ManualForm";

const AddRecipeForm = () => {
  // use state to conditionally render which form to use, url or manual
  const [isManual, setIsManual] = useState(false);

  const onToggle = () => {
    setIsManual(!isManual);
  };

  return (
    <div>
      <div className="mb-4">
        <label>Enter URL</label>
        <Switch onChange={onToggle} />
        <label>Enter Recipe Manually</label>
      </div>
      {isManual ? <ManualForm /> : <RecipeURLForm />}
    </div>
  );
};

export default AddRecipeForm;
