"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
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
        {/* <p className="float-left">{name}</p> */}
        <div className="float-right">
          <MainDropDownMenu />
        </div>
        {/* <button
          className="float-right hover:text-secondary"
          onClick={() => signOut()}
        >
          Log Out
          <LogoutIcon className="pl-1" />
        </button> */}
      </div>
    );
  }

  return (
    <div>
      {status === "unauthenticated" ? (
        <></>
      ) : (
        // <button onClick={() => signIn()}>Sign In</button>
        <div>
          <Image
            src={image}
            width="40"
            height="40"
            className="rounded-full float-left mr-4"
            alt="profile-image"
          />
          <>{name}</>
        </div>
      )}
    </div>
  );
}

export default SignInButton;
