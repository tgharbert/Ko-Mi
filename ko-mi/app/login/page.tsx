"use client";
import SignInButton from "../components/SignInButton";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="text-center">
      <div>
        <p className="">
          Welcome to Ko-Mi! Sign-In or Sign Up with the button in the top bar or
          below:
        </p>
        <div className="bg-lime-500 w-1/5">
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
