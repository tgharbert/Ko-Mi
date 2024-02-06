"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();
  const { data: sessionData, status } = useSession();

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
      {status === "unauthenticated" ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <>ONE SECOND GEEEZ</>
      )}
    </div>
  );
};

export default SignInButton;
