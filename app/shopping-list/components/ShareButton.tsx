import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FriendsList from "@/app/friends/components/FriendsList";

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // the alert should be here because otherwise it's closing when the dialog closes
  // therefore only onscreen for moments
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlert(false);
  };

  const openSnackbar = () => {
    setIsAlert(true);
  };

  return (
    <div className="px-5 flex justify-center content-center">
      {isAlert ? (
        <Snackbar
          open={isAlert}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Added Ingredients!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      <div className="pt-4">
        <Button
          onClick={handleClickOpen}
          sx={{
            color: "white",
          }}
          color="lime"
        >
          Share
          <ShareIcon></ShareIcon>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          className="justify-center content-center "
        >
          <div className="px-10 pt-4 pb-8 justify-center flex font-bold text-lg bg-tertiary">
            <FriendsList />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ShareButton;
