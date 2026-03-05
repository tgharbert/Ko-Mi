import { useState, useEffect, useRef } from "react";
import YieldDropdown from "./YieldDropdown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function AddIngredientsButton({
  recipeYield,
  recipeIngredients,
}: {
  recipeYield: number;
  recipeIngredients: Ingredient[];
}) {
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openSnackbar = () => {
    setIsAlert(true);
    setTimeout(() => setIsAlert(false), 2000);
  };

  return (
    <div className="flex items-center">
      {isAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span>Added Ingredients!</span>
          <button onClick={() => setIsAlert(false)} className="ml-2 font-bold">×</button>
        </div>
      )}
      <button
        className="cursor-pointer hover:text-lime-600 flex "
        onClick={handleClickOpen}
      >
        <AddShoppingCartIcon className="mr-3" /> Add Ingredients
      </button>
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className="rounded-xl backdrop:bg-black/50 p-0"
      >
        <p className="px-10 pt-4 pb-4 justify-center flex font-bold text-black">
          Adjust Serving Size:
        </p>
        <div className="flex justify-center content-center">
          <p className="px-10 italic text-center pb-4 text-black">
            <b>{recipeYield}</b> is the standard serving size
          </p>
        </div>
        <YieldDropdown
          recipeYield={recipeYield}
          recipeIngredients={recipeIngredients}
          handleClose={handleClose}
          openSnackbar={openSnackbar}
        />
      </dialog>
    </div>
  );
}

export default AddIngredientsButton;
