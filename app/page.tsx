import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { Suspense } from "react";
import LoadingPage from "./loading";
import RecipeSearchBar from "./components/homepage/SearchBar";
import verifyUser from "@/utils/verifyUser";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "name";
  // at the moment pagination is half-built...
  const currentPage = Number(searchParams?.page) || 1;

  await verifyUser();

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <RecipeSearchBar category={category} />
      <Suspense fallback={<LoadingPage />} key={query + currentPage}>
        <RecipeList
          query={query}
          currentPage={currentPage}
          category={category}
        />
      </Suspense>
    </div>
  );
}
