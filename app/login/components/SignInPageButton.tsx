"use client";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import PrimaryButton from "@/app/components/PrimaryButton";

function SignInPageButton() {
  return (
    <PrimaryButton onClick={() => signIn()}>
      Sign In
      <LogIn className="pl-1" size={20} />
    </PrimaryButton>
  );
}

export default SignInPageButton;
