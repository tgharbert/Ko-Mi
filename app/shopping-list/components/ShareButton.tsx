import { Share2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FriendsDropDown from "./FriendsDropdown";
import Toast from "@/app/components/Toast";

const ShareButton = () => {
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

  const handleSnackbarClose = () => {
    setIsAlert(false);
  };

  const openSnackbar = () => {
    setIsAlert(true);
    setTimeout(() => setIsAlert(false), 2000);
  };

  return (
    <div className="px-5 flex justify-center content-center">
      {isAlert && (
        <Toast message="Shared Ingredients!" onClose={handleSnackbarClose} />
      )}
      <div className="pt-4">
        <button
          onClick={handleClickOpen}
          className="text-white hover:text-accent flex items-center gap-1"
        >
          Share
          <Share2 size={20} />
        </button>
        <dialog
          ref={dialogRef}
          onClose={handleClose}
          onClick={(e) => { if (e.target === dialogRef.current) handleClose(); }}
          className="rounded-xl backdrop:bg-black/50 p-0"
        >
          <div className="px-10 pt-4 pb-8 justify-center flex text-lg bg-tertiary text-black">
            <FriendsDropDown
              openSnackbar={openSnackbar}
              handleClose={handleClose}
            />
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ShareButton;
