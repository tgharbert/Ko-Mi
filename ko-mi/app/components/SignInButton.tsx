"use client";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

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
