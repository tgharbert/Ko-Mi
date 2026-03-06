import type { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Shopping List",
};
import verifyUser from "@/utils/verifyUser";
import AddListItemBar from "./components/NewIngredientBar";
import TopStack from "./components/TopStack";
import IngredientList from "./components/IngredientList";
import LoadingPage from "../loading";
import { Suspense } from "react";

export default async function Ingredients() {
  const user: User | null = await verifyUser();

  if (user === null) {
    return;
  }

  return (
    <main className="text-center">
      <div className="-mt-12">
        <Header />
      </div>
      <div className="sticky top-0 z-20 bg-primary pt-4">
        <AddListItemBar id={user.id} />
        <TopStack id={user.id} />
      </div>
      <div className="relative mx-4 sm:mx-auto min-h-screen">
        <Suspense fallback={<LoadingPage />}>
          <IngredientList id={user.id} />
        </Suspense>
      </div>
    </main>
  );
}
