import type { Metadata } from "next";
import Header from "./components/Header";
import RecipeList from "./components/homepage/RecipeList";

export const metadata: Metadata = {
  title: "Home",
};
import { Suspense } from "react";
import LoadingPage from "./loading";
import RecipeSearchBar from "./components/homepage/SearchBar";
import UserSelectors from "./components/homepage/userselectors/UserSelectors";
import verifyUser from "@/utils/verifyUser";
import { getRecipes } from "./data/getRecipes";

export default async function Home(props: {
  searchParams?: Promise<{
    category?: string;
    query?: string;
    page?: string;
    random?: string;
    all?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "name";
  const currentPage = Number(searchParams?.page) || 1;
  const random = searchParams?.random || "false";
  const all = searchParams?.all || "false";

  const user: User | null = await verifyUser();
  if (user === null) {
    return;
  }

  const getUserRecipes = async (
    page: number,
    query: string,
    category: string,
    all: string,
    random: string,
    id: string
  ) => {
    "use server";
    let response = await getRecipes(query, category, page, random, all, id);
    let recipeData = await response?.json();
    return recipeData;
  };

  return (
    <main className="text-center flexbox content-center">
      <div className="-mt-12">
        <Header />
      </div>
      <div className="sticky top-0 z-20">
        <div className="bg-primary pt-4">
          <RecipeSearchBar category={category} currentPage={currentPage} />
          <UserSelectors random={random} />
        </div>
        <div className="pointer-events-none h-6 bg-gradient-to-b from-primary to-transparent" />
      </div>
      <div className="relative mx-4 sm:mx-auto min-h-screen">
        <Suspense fallback={<LoadingPage />} key={query + currentPage}>
          <RecipeList
            query={query}
            category={category}
            currentPage={currentPage}
            random={random}
            all={all}
            user={user}
            getUserRecipes={getUserRecipes}
          />
        </Suspense>
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent z-10" />
    </main>
  );
}
