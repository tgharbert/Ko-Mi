"use client";
import RecipeURLForm from "./RecipeURLForm";
import { useState } from "react";
import ManualForm from "./manualform/ManualForm";

function AddRecipeForm() {
  // use state to conditionally render which form to use, url or manual
  const [isManual, setIsManual] = useState(false);

  const onToggle = () => {
    setIsManual(!isManual);
  };

  return (
    <div>
      {isManual ? <ManualForm /> : <RecipeURLForm />}
      <div className="mt-4 flex items-center justify-center gap-2">
        <label className={`text-sm transition-colors ${isManual ? "text-tertiary/70" : "text-tertiary font-medium"}`}>Enter URL</label>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isManual ? "bg-secondary" : "bg-tertiary/30"}`}
          role="switch"
          aria-checked={isManual}
          aria-label="Toggle between URL and manual entry"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-tertiary transition-transform ${isManual ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
        <label className={`text-sm transition-colors ${isManual ? "text-tertiary font-medium" : "text-tertiary/70"}`}>Enter Recipe Manually</label>
      </div>
      {isManual ? <ManualForm /> : <RecipeURLForm />}
    </div>
  );
}

export default AddRecipeForm;
