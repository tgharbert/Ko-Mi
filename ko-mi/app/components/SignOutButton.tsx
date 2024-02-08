"use client";
{
  /* <button className="float-right" onClick={() => signOut()}>
          Sign Out
        </button> */
}
import { signIn, signOut, useSession } from "next-auth/react";

const SignOutButton = () => {
  return (
    <div>
      <button className="float-right" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
