"use client";
import { Trash2, ListX } from "lucide-react";
import ShareButton from "./ShareButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useIngredients } from "../hooks/useIngredients";

export default function TopStack({ id }: { id: string }) {
  const { deleteAll, deleteChecked } = useIngredients();

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
      <ShareButton />
    </div>
  );
}
