// "use client";
import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { Suspense } from "react";
import LoadingPage from "./loading";
import { redirect } from "next/navigation";

export default async function Home() {
  // const { data: sessionData, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("login");
  //   }
  // }, [status]);

  // if (status === "authenticated") {
  //   router.push("login");
  // }

  // NEED TO FIGURE OUT HOW TO ROUTE TO THE LOGIN WHEN A USER ISN'T SIGNED IN

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <RecipeList />
      </Suspense>
    </div>
  );
}
