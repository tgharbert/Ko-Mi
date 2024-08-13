"use client";
import RecipeURLForm from "./RecipeURLForm";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import ManualForm from "./manualform/ManualForm";

function AddRecipeForm() {
  // use state to conditionally render which form to use, url or manual
  const [isManual, setIsManual] = useState(false);

  const onToggle = () => {
    setIsManual(!isManual);
  };

  return (
    <div>
      <div className="mb-4">
        <label>Enter URL</label>
        <Switch
          onChange={onToggle}
          // figure out a way to have the theme provider add this
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#65A30D", // Thumb color when checked
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#65A30D", // Track color when checked
            },
            "& .MuiSwitch-track": {
              backgroundColor: "lightgray", // Track color when unchecked
            },
          }}
        />
        <label>Enter Recipe Manually</label>
      </div>
      {isManual ? <ManualForm /> : <RecipeURLForm />}
    </div>
  );
}

export default AddRecipeForm;
