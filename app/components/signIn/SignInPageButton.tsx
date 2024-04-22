"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

function SignInPageButton() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          variant="contained"
          className=" bg-lime-500"
          onClick={() => signIn()}
          color="lime"
        >
          Sign In
          <LoginIcon className="pl-1" />
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default SignInPageButton;
