"use client";
import { useRef, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { ingredientApi } from "@/lib/api-client";

function AddListItemBar({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item = formData.get("item") as string;

    if (!item?.trim()) {
      setError("Please enter an item");
      return;
    }

    try {
      setError(null);
      await ingredientApi.addItem(item.trim());
      formRef.current?.reset();
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Failed to add item:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item";
      setError(errorMessage);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        className="text-black w-1/2 sm:w-1/5 rounded px-4 pt-1 pb-1  "
        type="text"
        name="item"
        placeholder="Item to add..."
        autoFocus
      />
      <Button isPending={isPending} />
      {error && <span className="text-red-500 ml-2">{error}</span>}
    </form>
  );
}

export function Button({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1"
      disabled={isPending}
    >
      {isPending ? "Adding..." : "Add Item"}
    </button>
  );
}

export default AddListItemBar;
