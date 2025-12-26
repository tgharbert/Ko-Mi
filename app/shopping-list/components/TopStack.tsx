"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ShareButton from "./ShareButton";
import { ingredientApi } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function TopStack({ id }: { id: string }) {
  const router = useRouter();

  const handleDeleteIngredients = async () => {
    try {
      await ingredientApi.deleteAll();
      router.refresh();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteChecked = async () => {
    try {
      await ingredientApi.deleteChecked();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pb-4 mt-4 sm:mt-6 ml-4">
      <Stack direction="row" className="flex justify-center content-center ">
        <Button
          variant="contained"
          className=" bg-lime-500"
          onClick={handleDeleteChecked}
          color="lime"
        >
          <PlaylistRemoveIcon className="mr-2" />
          Delete Checked
        </Button>
        <div className="px-4">
          <Button
            variant="contained"
            className="bg-lime-500"
            onClick={handleDeleteIngredients}
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
