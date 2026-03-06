"use client";
import { useRef, useState } from "react";
import { useIngredients } from "../hooks/useIngredients";

function AddListItemBar({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useIngredients();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item = formData.get("item") as string;

    if (!item?.trim()) {
      setError("Please enter an item");
      return;
    }

    setError(null);
    addItem.mutate(item.trim(), {
      onSuccess: () => {
        formRef.current?.reset();
      },
      onError: (err) => {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to add item";
        setError(errorMessage);
      },
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex items-center justify-center gap-2 max-w-lg mx-auto px-4">
      <input
        className="flex-1 rounded-md bg-primary/40 text-tertiary placeholder-tertiary/40 px-4 py-2 border border-white/10 focus:border-accent focus:outline-none"
        type="text"
        name="item"
        aria-label="Add shopping list item"
        placeholder="Item to add..."
        autoFocus
      />
      <Button isPending={addItem.isPending} />
      {error && <span className="text-red-500 ml-2">{error}</span>}
    </form>
  );
}

export function Button({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      className="bg-secondary hover:bg-red-700 active:scale-95 text-tertiary rounded-md px-4 py-2 whitespace-nowrap transition-all duration-150"
      disabled={isPending}
    >
      {isPending ? "Adding..." : "Add Item"}
    </button>
  );
}

export default AddListItemBar;
