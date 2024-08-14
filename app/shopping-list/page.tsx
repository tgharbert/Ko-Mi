"use server";
import Header from "../components/Header";
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
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <AddListItemBar id={user.id} />
      <TopStack />
      <Suspense fallback={<LoadingPage />}>
        <IngredientList id={user.id} />
      </Suspense>
    </div>
  );
}
