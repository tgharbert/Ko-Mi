"use client";

import { addItemToList } from "@/lib/addItemToList";
import { getUserIngredients } from "@/lib/ingredients";
import { useState } from "react";

const AddListItemBar = () => {
  const [item, setItem] = useState("");

  const handleItemSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItemToList(item);
    getUserIngredients();
    setItem("");
  };

  return (
    <div>
      <form onSubmit={handleItemSubmit}>
        <input
          className="text-black w-1/2 rounded px-4 pt-1 pb-1 "
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item to add..."
          autoFocus
        />
        <button className="bg-lime-500 hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddListItemBar;
