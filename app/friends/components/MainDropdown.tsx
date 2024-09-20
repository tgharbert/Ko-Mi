"use client";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "next-auth/react";
import Link from "next/link";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function MainDropDownMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="-mt-2">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        aria-label="open-menu"
      >
        <MenuIcon style={{ color: "white" }} sx={{ fontSize: 30 }} />
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
        <Link href="/friends">
          <MenuItem onClick={handleClose}>Friends</MenuItem>
        </Link>
        <Link href="/about">
          <MenuItem>About</MenuItem>
        </Link>
        <MenuItem onClick={() => signOut()}>
          Logout
          <LogoutIcon className="pl-1" />
        </MenuItem>
      </Menu>
    </div>
  );
}
