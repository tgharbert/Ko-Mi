"use client";
import { Trash2, ListX } from "lucide-react";
import ShareButton from "./ShareButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useIngredients } from "../hooks/useIngredients";

export default function TopStack({ id }: { id: string }) {
  const { deleteAll, deleteChecked } = useIngredients();

  return (
    <div className="pb-4 mt-4 sm:mt-6 ml-4">
      <div className="flex flex-row justify-center content-center">
        <PrimaryButton onClick={() => deleteChecked.mutate()} className="inline-flex items-center">
          <ListX className="mr-2" size={20} />
          Delete Checked
        </PrimaryButton>
        <div className="px-4">
          <PrimaryButton onClick={() => deleteAll.mutate()} className="inline-flex items-center">
            <Trash2 className="mr-2" size={20} />
            Delete All
          </PrimaryButton>
        </div>
      </div>
      <ShareButton />
    </div>
  );
}
