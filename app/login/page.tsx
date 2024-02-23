"use client";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInPageButton from "../components/signIn/SignInPageButton";
import { Suspense } from "react";
import LoadingPage from "../loading";

const Login = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="flex justify-center items-center pr-6 pl-6 text-center pt-80">
        <div className="-mt-20">
          <p className="text-xl pb-3 font-bold">Welcome to Ko-Mi!</p>
          <p className="pb-3">
            At the moment, we only support Google accounts.
          </p>
          <p className="pb-3">Sign-In or Sign Up with the button below:</p>
          <div className=" text-center  ">
            <SignInPageButton />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
