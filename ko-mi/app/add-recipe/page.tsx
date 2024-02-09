import RecipeURLForm from "../components/add-recipe/RecipeURLForm";
import Header from "../components/Header";
import LoadingPage from "../loading";
import { Suspense } from "react";
import verifyUser from "@/utils/verifyUser";

const AddRecipe = async () => {
  await verifyUser();

  return (
    <div className="text-center">
      <div className="-mt-9">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <RecipeURLForm />
      </Suspense>
    </div>
  );
};

export default AddRecipe;
