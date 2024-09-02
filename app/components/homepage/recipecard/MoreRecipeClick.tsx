"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { addUserRecipe } from "@/app/data/addUserRecipe";
import { useRouter } from "next/navigation";

const MoreRecipeClick = ({
  user,
  added,
  author,
  recipeId,
}: {
  user: User;
  added: string;
  author: string;
  recipeId: number;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  return (
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
        <MoreVertIcon />
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
        {/* THIS PAGE WILL BE /[RECIPE.ID] WHERE THE USER WILL BE ABLE TO ADD PHOTO AND MODIFY A RECIPE */}
        <Link href={`/change/${recipeId}`}>
          {user.name === author && (
            <MenuItem onClick={() => router.push(`/change/${recipeId}`)}>
              Modify
            </MenuItem>
          )}
        </Link>
        {user.id !== added && (
          <MenuItem onClick={() => addUserRecipe(recipeId)}>
            Add to my Ko-Mi
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MoreRecipeClick;
