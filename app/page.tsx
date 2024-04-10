import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { Suspense } from "react";
import LoadingPage from "./loading";
import RecipeSearchBar from "./components/homepage/SearchBar";
import RandomButton from "./components/homepage/userselectors/RandomButton";
import UserSelectors from "./components/homepage/userselectors/UserSelectors";
import verifyUser from "@/utils/verifyUser";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    query?: string;
    page?: string;
    random?: string;
    all?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "name";
  const currentPage = Number(searchParams?.page) || 1;
  const random = searchParams?.random || "false";
  const all = searchParams?.all || "false";

  await verifyUser();

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <RecipeSearchBar category={category} currentPage={currentPage} />

      {/* TOGGLE FOR THE USER OR ALL RECIPES */}
      {/* <RandomButton random={random} /> */}
      <UserSelectors random={random} />
      <Suspense fallback={<LoadingPage />} key={query + currentPage}>
        <RecipeList
          query={query}
          currentPage={currentPage}
          category={category}
          random={random}
          all={all}
        />
      </Suspense>
    </div>
  );
}
