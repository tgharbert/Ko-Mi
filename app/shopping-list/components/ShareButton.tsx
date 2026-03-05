import ShareIcon from "@mui/icons-material/Share";
import { useState, useEffect, useRef } from "react";
import FriendsDropDown from "./FriendsDropdown";

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
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span>Shared Ingredients!</span>
          <button onClick={handleSnackbarClose} className="ml-2 font-bold">×</button>
        </div>
      )}
      <div className="pt-4">
        <button
          onClick={handleClickOpen}
          className="text-white hover:text-lime-400 flex items-center gap-1"
        >
          Share
          <ShareIcon />
        </button>
        <dialog
          ref={dialogRef}
          onClose={handleClose}
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
