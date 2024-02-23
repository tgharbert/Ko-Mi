"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInPageButton = () => {
  // const { data: session } = useSession();
  // const { data: sessionData, status } = useSession();
  // const name = session?.user?.name;

  // if (session && session.user) {
  //   return (
  //     <div className="flow-root w-full	">
  //       <p className="float-left">{session.user.name}</p>
  //       <button className="float-right " onClick={() => signOut()}>
  //         Sign Out
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <button
        className="bg-lime-500 px-3 rounded hover:bg-lime-600"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInPageButton;
