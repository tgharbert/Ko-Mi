"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ShareButton from "./ShareButton";
import { useIngredients } from "../hooks/useIngredients";

export default function TopStack({ id }: { id: string }) {
  const { deleteAll, deleteChecked } = useIngredients();

  return (
    <div className="pb-4 mt-4 sm:mt-6 ml-4">
      <div className="flex flex-row justify-center content-center">
        <button
          className="bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded"
          onClick={() => deleteChecked.mutate()}
        >
          <PlaylistRemoveIcon className="mr-2" />
          Delete Checked
        </button>
        <div className="px-4">
          <button
            className="bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded"
            onClick={() => deleteAll.mutate()}
          >
            <DeleteIcon className="mr-2" />
            Delete All
          </button>
        </div>
      </div>
      <ShareButton />
    </div>
  );
}
