import Header from "../components/Header";
import IngredientsList from "../components/ingredients/IngredientsList";
import { Suspense } from "react";
import LoadingPage from "../loading";
import verifyUser from "@/utils/verifyUser";

const Ingredients = async () => {
  await verifyUser();

  return (
    <div className="text-center pb-10">
      <div className="-mt-9">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <IngredientsList />
      </Suspense>
    </div>
  );
};

export default Ingredients;
