import Header from "../components/Header";
import IngredientsList from "../components/ingredients/IngredientsList";
import { Suspense } from "react";
import LoadingPage from "../loading";

const Ingredients = () => {
  return (
    <div className="text-center">
      <div className="-mt-9">
        <Header />
      </div>
      <h2 className="pb-4">Your Current Shopping List:</h2>
      <Suspense fallback={<LoadingPage />}>
        <IngredientsList />
      </Suspense>
    </div>
  );
};

export default Ingredients;
