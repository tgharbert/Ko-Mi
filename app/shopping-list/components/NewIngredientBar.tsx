"use client";
import { useFormState, useFormStatus } from "react-dom";
import { addItemAction } from "../actions";
import { useRef } from "react";

function AddListItemBar({ id }: { id: string }) {
  function wrappedAddItemAction(
    prevState: { item: string; message: string },
    formData: FormData
  ) {
    const userId: string = id;
    return addItemAction(prevState, formData, userId);
  }

  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(wrappedAddItemAction, {
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
        <Button />
      </form>
    </div>
  );
}

export function Button() {
  const status = useFormStatus();
  return (
    <button className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
      {status.pending ? "Adding..." : "Add Item"}
    </button>
  );
}

export default AddListItemBar;
