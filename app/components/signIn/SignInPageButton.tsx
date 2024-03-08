"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";
import Button from "@mui/material/Button";

const SignInPageButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <button
          className="bg-lime-500 px-3 rounded hover:bg-lime-600"
          onClick={() => signIn()}
        >
          Sign In
        </button> */}
        <Button
          variant="contained"
          className=" bg-lime-500"
          onClick={() => signIn()}
          color="lime"
        >
          Sign In
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default SignInPageButton;
