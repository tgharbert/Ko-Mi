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
      <AddListItemBar id={user.id} />
      <TopStack id={user.id} />
      <div className="relative mx-4 sm:mx-auto">
        <div className="sm:hidden pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-primary to-transparent z-10" />
        <div className="overflow-y-auto max-h-[62vh] sm:max-h-[65vh]">
          <Suspense fallback={<LoadingPage />}>
            <IngredientList id={user.id} />
          </Suspense>
        </div>
        <div className="sm:hidden pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-primary to-transparent z-10" />
      </div>
    </div>
  );
}
