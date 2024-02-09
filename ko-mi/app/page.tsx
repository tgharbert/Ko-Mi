import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { Suspense } from "react";
import LoadingPage from "./loading";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import verifyUser from "@/utils/verifyUser";

export default async function Home() {
  // this should be refactored and spread to other funcs.
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }
  await verifyUser();

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
