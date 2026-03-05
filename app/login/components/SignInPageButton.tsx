"use client";
import { signIn } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import PrimaryButton from "@/app/components/PrimaryButton";

function SignInPageButton() {
  return (
    <PrimaryButton onClick={() => signIn()}>
      Sign In
      <LoginIcon className="pl-1" />
    </PrimaryButton>
  );
}

export default SignInPageButton;
