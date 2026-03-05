import YieldDropdown from "./YieldDropdown";
import { ShoppingCart } from "lucide-react";
import Toast from "@/app/components/Toast";
import { useDialog } from "@/app/hooks/useDialog";
import { useToast } from "@/app/hooks/useToast";

function AddIngredientsButton({
  recipeYield,
  recipeIngredients,
}: {
  recipeYield: number;
  recipeIngredients: Ingredient[];
}) {
  const { open, close, dialogProps } = useDialog();
  const toast = useToast();

  return (
    <div className="flex items-center">
      {toast.isVisible && (
        <Toast message="Added Ingredients!" onClose={toast.hide} />
      )}
      <button
        className="cursor-pointer hover:text-accent active:scale-95 flex whitespace-nowrap transition-all duration-150"
        onClick={open}
      >
        <ShoppingCart className="mr-3" size={20} /> Add Ingredients
      </button>
      <dialog {...dialogProps}>
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
          handleClose={close}
          openSnackbar={toast.show}
        />
      </dialog>
    </div>
  );
}

export default AddIngredientsButton;
