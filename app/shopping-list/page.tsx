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
    <div className="text-center">
      <div className="-mt-12">
        <Header />
      </div>
      <div className="sticky top-0 z-20">
        <div className="bg-primary pt-4">
          <AddListItemBar id={user.id} />
          <TopStack id={user.id} />
        </div>
        <div className="pointer-events-none h-6 bg-gradient-to-b from-primary to-transparent" />
      </div>
      <div className="relative mx-4 sm:mx-auto min-h-screen">
        <Suspense fallback={<LoadingPage />}>
          <IngredientList id={user.id} />
        </Suspense>
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent z-10" />
    </div>
  );
}
