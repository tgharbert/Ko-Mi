"use client";
import Image from "next/image";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  console.log(sessionData);
  console.log("status: ", status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("login");
    }
  }, [status]);
  // const getRecipes = async () => {
  //   try {
  //     const userRecipes = await fetch("/api/get-recipes", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(recipes),
  //     });
  //     console.log(userRecipes);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getRecipes();
  // }, []);

  return (
    <div className="text-center ">
      <div className="-mt-9">
        <Header />
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
    </div>
  );
}
