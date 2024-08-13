import Header from "../components/Header";
import verifyUser from "@/utils/verifyUser";
import AddListItemBar from "./components/NewIngredientBar";
import TopStack from "./components/TopStack";
import IngredientList from "./components/IngredientList";
import LoadingPage from "../loading";
import { Suspense } from "react";

export default async function Ingredients() {
  await verifyUser();

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <AddListItemBar />
        <TopStack />
        <IngredientList />
      </Suspense>
    </div>
  );
}
