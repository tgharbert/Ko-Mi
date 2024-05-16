import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";
import { Suspense } from "react";
import LoadingPage from "./loading";
import RecipeSearchBar from "./components/homepage/SearchBar";
import UserSelectors from "./components/homepage/userselectors/UserSelectors";
import verifyUser from "@/utils/verifyUser";
import { getRecipes } from "@/lib/getRecipes";

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

  const getUserRecipes = async () => {
    "use server";
    let response = await getRecipes(query, category, currentPage, random, all);
    let recipeData = await response?.json();
    return recipeData;
  };

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-9">
        <Header />
      </div>
      <RecipeSearchBar category={category} currentPage={currentPage} />
      <UserSelectors random={random} />
      <Suspense fallback={<LoadingPage />} key={query + currentPage}>
        <RecipeList
          query={query}
          currentPage={currentPage}
          category={category}
          random={random}
          all={all}
          getUserRecipes={getUserRecipes}
        />
      </Suspense>
    </div>
  );
}
