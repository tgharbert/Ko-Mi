import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { Suspense } from "react";
import LoadingPage from "./loading";
import RecipeSearchBar from "./components/homepage/SearchBar";
import RandomButton from "./components/homepage/RandomButton";
import verifyUser from "@/utils/verifyUser";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    query?: string;
    page?: string;
    random?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "name";
  const currentPage = Number(searchParams?.page) || 1;
  const random = searchParams?.random || "false";

  await verifyUser();

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <RecipeSearchBar category={category} currentPage={currentPage} />
      {/* SET UP RANDOM BUTTON WHICH WILL SET THE 'RANDOM' VALUE TO QUERY IN THE SAME MANNER THAT THE SEARCH BAR DOES */}
      <RandomButton random={random} />
      <Suspense fallback={<LoadingPage />} key={query + currentPage}>
        <RecipeList
          query={query}
          currentPage={currentPage}
          category={category}
          random={random}
        />
      </Suspense>
    </div>
  );
}
