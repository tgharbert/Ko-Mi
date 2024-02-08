// "use client";
import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function Home() {
  // const { data: sessionData, status } = useSession();
  // const router = useRouter();

  // const recipeData = await req.json();
  const session = await getServerSession(authOptions);

  const user = session?.user || "";

  console.log(user);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("login");
  //   }
  // }, [status]);

  // if (status === "authenticated") {
  //   router.push("login");
  // }

  // const user = sessionData?.user;

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
      <RecipeList id={user.id} />
    </div>
  );
}
