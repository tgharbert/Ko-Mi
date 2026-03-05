import { Share2 } from "lucide-react";
import FriendsDropDown from "./FriendsDropdown";
import Toast from "@/app/components/Toast";
import { useDialog } from "@/app/hooks/useDialog";
import { useToast } from "@/app/hooks/useToast";

const ShareButton = () => {
  const { open, close, dialogProps } = useDialog();
  const toast = useToast();

  return (
    <div className="flex justify-center content-center">
      {toast.isVisible && (
        <Toast message="Shared Ingredients!" onClose={toast.hide} />
      )}
      <div>
        <button
          onClick={open}
          className="text-white hover:text-accent active:scale-95 flex items-center gap-1 transition-all duration-150"
        >
          Share
          <Share2 size={20} />
        </button>
        <dialog {...dialogProps}>
          <div className="px-10 pt-4 pb-8 justify-center flex text-lg bg-tertiary text-black">
            <FriendsDropDown
              openSnackbar={toast.show}
              handleClose={close}
            />
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ShareButton;
