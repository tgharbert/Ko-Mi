"use client";
import { signIn } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";

function SignInPageButton() {
  return (
    <button
      className="bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded"
      onClick={() => signIn()}
    >
      Sign In
      <LoginIcon className="pl-1" />
    </button>
  );
}

export default SignInPageButton;
