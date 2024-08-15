"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ShareButton from "./ShareButton";
import { deleteUserIngredients } from "@/app/shopping-list/data/ingredients";
import { deleteCheckedIngredients } from "@/app/shopping-list/data/deleteCheckedIngredients";
import theme from "@/mui-styles/styles";
import { ThemeProvider } from "@mui/material/styles";

export default function TopStack({ id }: { id: string }) {
  const handleDeleteIngredients = async () => {
    try {
      await deleteUserIngredients(id);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteChecked = async () => {
    try {
      await deleteCheckedIngredients(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
