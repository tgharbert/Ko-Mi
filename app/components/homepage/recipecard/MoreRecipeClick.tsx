"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { addUserRecipe } from "@/app/data/addUserRecipe";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";
import deleteUserRecipe from "@/app/data/deleteRecipe";

const MoreRecipeClick = ({
  user,
  added,
  author,
  recipeId,
  recipeName,
}: {
  user: User;
  added: string;
  author: string;
  recipeId: number;
  recipeName: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isDeleteClick, setDeleteClick] = useState(false);

  const onDeleteRecipe = () => {
    deleteUserRecipe(recipeId);
  };

  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <div className="-mb-4 -ml-4 -mx-4">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          aria-label="open-menu"
        >
          {/* CHANGE THIS TO THE EDIT ICON?? */}
          <MoreVertIcon className=" text-black" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Dialog
            open={isDeleteClick}
            onClose={() => setDeleteClick(false)}
            className="mx-10 justify-center content-center"
          >
            <p className="px-10 pt-4 pb-4 justify-center flex font-bold ">
              Are you sure you want to delete:
            </p>
            <div className="px-10 pb-4 justify-center flex font-bold ">
              <b>{recipeName}</b>
            </div>
            <div className="flex justify-center content-center mb-4">
              <Button
                variant="contained"
                className=" secondary "
                onClick={onDeleteRecipe}
                color="lime"
              >
                Yes
              </Button>
            </div>
          </Dialog>
          {user.name === author && (
            <div>
              <Link href={`/change/${recipeId}`}>
                <MenuItem onClick={() => router.push(`/change/${recipeId}`)}>
                  Modify
                </MenuItem>
              </Link>
              <MenuItem onClick={() => setDeleteClick(!isDeleteClick)}>
                Delete Recipe
              </MenuItem>
            </div>
          )}
          {user.id !== added && (
            <MenuItem onClick={() => addUserRecipe(recipeId)}>
              Add to my Ko-Mi
            </MenuItem>
          )}
        </Menu>
      </div>
    </ThemeProvider>
  );
};

export default MoreRecipeClick;
