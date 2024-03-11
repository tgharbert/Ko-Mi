"use client";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInPageButton from "../components/signIn/SignInPageButton";
import { Suspense } from "react";
import LoadingPage from "../loading";
import Image from "next/image";
import logo from "@/images/ko-mi_logo_1.png";

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
      <div className=" flex justify-center items-center pr-6 pl-6 text-center sm:pt-80 pt-60">
        <div className="-mt-40 bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 ">
          <div className="flex justify-center">
            <Image src={logo} alt="ko-mi logo" width={100} height={100}></Image>
          </div>
          <p className="text-xl pb-3 font-bold">Welcome to Ko-Mi!</p>
          <p className="pb-3">
            Ko-Mi is your ultimate grocery shopping assistant and cookbook
            companion! With Ko-Mi, planning meals, creating shopping lists, and
            discovering new recipes has never been easier. Seamlessly browse
            through a vast collection of delicious recipes and streamline your
            shopping experience, all in one intuitive app.
          </p>
          <p className="pb-3">
            At the moment, we only support <b>Google</b> accounts.
          </p>
          {/* <p className="pb-3">Sign-In or Sign Up with the button below:</p> */}
          <div className=" text-center  ">
            <SignInPageButton />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
