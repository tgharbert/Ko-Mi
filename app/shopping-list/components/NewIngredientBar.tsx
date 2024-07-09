"use client";
// import { addItemToList } from "@/lib/addItemToList";
import { useFormState, useFormStatus } from "react-dom";
import { addItemAction } from "../actions";
import { useRef } from "react";
import Loading from "../loading";

function AddListItemBar() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addItemAction, {
    item: "",
    message: "",
  });

  if (state.message === "success") {
    formRef.current?.reset();
  }

  return (
    <div>
      <form ref={formRef} action={action}>
        <input
          className="text-black w-1/2 sm:w-1/5 rounded px-4 pt-1 pb-1  "
          type="text"
          name="item"
          placeholder="Item to add..."
          autoFocus
        />
        {/* <button className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
          Add Item
        </button> */}
        <Button />
      </form>
    </div>
  );
}

export function Button() {
  const status = useFormStatus();
  return (
    <button className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
      {/* Add Item */}
      {status.pending ? "Adding..." : "Add Item"}
    </button>
  );
}

export default AddListItemBar;
