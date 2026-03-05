"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ShareButton from "./ShareButton";
import { useIngredients } from "../hooks/useIngredients";

export default function TopStack({ id }: { id: string }) {
  const { deleteAll, deleteChecked } = useIngredients();

  return (
    <div className="pb-4 mt-4 sm:mt-6 ml-4">
      <Stack direction="row" className="flex justify-center content-center ">
        <Button
          variant="contained"
          className=" bg-lime-500"
          onClick={() => deleteChecked.mutate()}
          color="lime"
        >
          <PlaylistRemoveIcon className="mr-2" />
          Delete Checked
        </Button>
        <div className="px-4">
          <Button
            variant="contained"
            className="bg-lime-500"
            onClick={() => deleteAll.mutate()}
            color="lime"
          >
            <DeleteIcon className="mr-2" />
            Delete All
          </Button>
        </div>
      </Stack>
      <ShareButton />
    </div>
  );
}
