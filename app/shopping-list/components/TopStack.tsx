"use client";
import { Trash2, ListX, ListCollapse } from "lucide-react";
import ShareButton from "./ShareButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useIngredients } from "../hooks/useIngredients";

export default function TopStack({ id }: { id: string }) {
  const { data, deleteAll, deleteChecked, consolidate } = useIngredients();

  return (
    <div className="pb-4 mt-4 sm:mt-6">
      <div className="flex flex-row justify-center items-center gap-3 px-4">
        <PrimaryButton onClick={() => deleteChecked.mutate()} className="inline-flex items-center text-sm sm:text-base">
          <ListX className="mr-1.5 shrink-0" size={18} />
          Delete Checked
        </PrimaryButton>
        <PrimaryButton onClick={() => deleteAll.mutate()} className="inline-flex items-center text-sm sm:text-base">
          <Trash2 className="mr-1.5 shrink-0" size={18} />
          Delete All
        </PrimaryButton>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 px-4 mt-5">
        <button
          onClick={() => consolidate.mutate()}
          className="inline-flex items-center text-xs sm:text-sm text-accent border border-accent px-3 py-1.5 rounded hover:bg-accent hover:text-black active:scale-95 transition-all duration-150 whitespace-nowrap"
        >
          <ListCollapse className="mr-1 shrink-0" size={14} />
          Consolidate
        </button>
        <ShareButton />
        <span className="text-tertiary text-xs sm:text-sm tabular-nums">
          {data.length} {data.length === 1 ? "item" : "items"}
        </span>
      </div>
    </div>
  );
}
