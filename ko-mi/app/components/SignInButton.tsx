"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flow-root w-full	">
        <p className="float-left">{session.user.name}</p>
        <button className="float-right" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default SignInButton;
