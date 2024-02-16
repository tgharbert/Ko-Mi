import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import YieldDropdown from "./YieldDropdown";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const AddIngredientsButton = ({
  recipeYield,
  recipeIngredients,
}: {
  recipeYield: number;
  recipeIngredients: Ingredient[];
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="px-5 bg-tertiary flex justify-center content-center">
      <button
        className="cursor-pointer hover:text-lime-600 flex "
        onClick={handleClickOpen}
      >
        <AddShoppingCartIcon className="mr-3" /> Add Ingredients
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="mx-10 justify-center content-center"
      >
        <p className="px-10 pt-4 pb-4 justify-center flex font-bold text-lg">
          Adjust Serving Size:
        </p>
        <div className="flex justify-center content-center">
          <p className="px-10 italic text-center pb-4">
            <b>{recipeYield}</b> is the standard serving size
          </p>
        </div>
        <YieldDropdown
          recipeYield={recipeYield}
          recipeIngredients={recipeIngredients}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
};

export default AddIngredientsButton;
