"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

export default function TopStack({
  handleDeleteChecked,
  handleDeleteIngredients,
}: {
  handleDeleteChecked: any;
  handleDeleteIngredients: any;
}) {
  return (
    <div className="pb-4 mt-4 sm:mt-6 ml-4">
      <Stack direction="row" className="flex justify-center content-center ">
        <Button
          variant="contained"
          className=" bg-lime-500"
          onClick={handleDeleteChecked}
          color="lime"
        >
          {/* <DeleteIcon className="" /> */}
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
    </div>
  );
}
