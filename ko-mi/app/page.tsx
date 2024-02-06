"use client";
import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("login");
    }
  }, [status]);

  const user = sessionData?.user;

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
      <RecipeList user={user} />
    </div>
  );
}
