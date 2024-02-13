"use client";
import SignInButton from "../components/SignInButton";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInPageButton from "../components/signIn/SignInPageButton";

const Login = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex justify-center items-center">
      <div>
        <p className="">
          Welcome to Ko-Mi! At the moment, we only support Google accounts.
          Sign-In or Sign Up with the button below:
        </p>
        <div className="bg-lime-500 w-1/5 text-center">
          {/* DESIGN A NEW SIGNIN BUTTON FOR THIS?... */}
          {/* <SignInButton /> */}
          <SignInPageButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
