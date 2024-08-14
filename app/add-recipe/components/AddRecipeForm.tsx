"use client";
import RecipeURLForm from "./RecipeURLForm";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import ManualForm from "./manualform/ManualForm";
import { ThemeProvider } from "@emotion/react";
import theme from "@/mui-styles/styles";

function AddRecipeForm() {
  // use state to conditionally render which form to use, url or manual
  const [isManual, setIsManual] = useState(false);

  const onToggle = () => {
    setIsManual(!isManual);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="mb-4">
          <label>Enter URL</label>
          <Switch onChange={onToggle} />
          <label>Enter Recipe Manually</label>
        </div>
        {isManual ? <ManualForm /> : <RecipeURLForm />}
      </ThemeProvider>
    </div>
  );
}

export default AddRecipeForm;
