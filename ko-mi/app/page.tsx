import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { Suspense } from "react";
import LoadingPage from "./loading";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import RecipeSearchBar from "./components/homepage/SearchBar";
import verifyUser from "@/utils/verifyUser";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // this should be refactored and spread to other funcs.
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  await verifyUser();

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />} key={query + currentPage}>
        <RecipeSearchBar />
        <RecipeList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
