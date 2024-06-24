"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import MainDropDownMenu from "../friends/components/MainDropdown";

function SignInButton({ name, image }: { name: string; image: string }) {
  const { data: session } = useSession();
  const { data: sessionData, status } = useSession();

  if (session && session.user) {
    return (
      <div className="flow-root w-full">
        <Image
          src={image}
          width="40"
          height="40"
          className="rounded-full float-left mr-4"
          alt="profile-image"
        />
        <div className="float-right">
          <MainDropDownMenu />
        </div>
      </div>
    );
  }

  return (
    <div className="flow-root w-full">
      {status === "unauthenticated" ? (
        <></>
      ) : (
        <div className="flow-root w-full">
          <Image
            src={image}
            width="40"
            height="40"
            className="rounded-full float-left mr-4"
            alt="profile-image"
          />
          <div className="float-right">
            <MainDropDownMenu />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInButton;
