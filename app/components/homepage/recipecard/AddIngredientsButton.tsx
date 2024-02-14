import * as React from "react";
// import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import YieldDropdown from "./YieldDropdown";

const AddIngredientsButton = ({ recipeYield }: { recipeYield: number }) => {
  const [open, setOpen] = React.useState(false);
  // need to pass the recipeYield to dropdown

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Ingredients
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adjust Serving Size"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Serving Size
          </DialogContentText>
        </DialogContent>
        <YieldDropdown recipeYield={recipeYield} />
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
};

export default AddIngredientsButton;
