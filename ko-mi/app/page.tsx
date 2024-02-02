"use client";
import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  // const [recipes, setRecipes] = useState([]);
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("login");
    }
  }, [status]);

  return (
    <div className="text-center ">
      <div className="-mt-9">
        <Header />
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
      <RecipeList />
    </div>
  );
}
