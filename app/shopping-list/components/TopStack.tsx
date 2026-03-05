"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ShareButton from "./ShareButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useIngredients } from "../hooks/useIngredients";

export default function TopStack({ id }: { id: string }) {
  const { deleteAll, deleteChecked } = useIngredients();

  return (
    <div className="pb-4 mt-4 sm:mt-6 ml-4">
      <div className="flex flex-row justify-center content-center">
        <PrimaryButton onClick={() => deleteChecked.mutate()}>
          <PlaylistRemoveIcon className="mr-2" />
          Delete Checked
        </PrimaryButton>
        <div className="px-4">
          <PrimaryButton onClick={() => deleteAll.mutate()}>
            <DeleteIcon className="mr-2" />
            Delete All
          </PrimaryButton>
        </div>
      </div>
      <ShareButton />
    </div>
  );
}
