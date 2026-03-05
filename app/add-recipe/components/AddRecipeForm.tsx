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
      <div className="mb-4">
        <label>Enter URL</label>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full mx-2 transition-colors ${isManual ? "bg-secondary" : "bg-gray-300"}`}
          role="switch"
          aria-checked={isManual}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isManual ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
        <label>Enter Recipe Manually</label>
      </div>
      {isManual ? <ManualForm /> : <RecipeURLForm />}
    </div>
  );
}

export default AddRecipeForm;
