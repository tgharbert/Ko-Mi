"use client";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

function SignInPageButton() {
  return (
    <Button
      variant="contained"
      className=" bg-lime-500"
      onClick={() => signIn()}
      color="lime"
    >
      Sign In
      <LoginIcon className="pl-1" />
    </Button>
  );
}

export default SignInPageButton;
