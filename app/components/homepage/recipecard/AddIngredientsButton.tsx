import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import YieldDropdown from "./YieldDropdown";

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
    <div className="px-5 bg-tertiary">
      <button
        className="font-bold cursor-pointer hover:text-lime-600"
        onClick={handleClickOpen}
      >
        Add Ingredients
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="mx-10 justify-center content-center"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Adjust Serving Size"}
        </DialogTitle> */}
        <p className="px-10 pt-4 pb-8">Adjust Serving Size</p>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Serving Size
          </DialogContentText>
        </DialogContent> */}
        <YieldDropdown
          recipeYield={recipeYield}
          recipeIngredients={recipeIngredients}
          handleClose={handleClose}
        />
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default AddIngredientsButton;
