import type { Metadata } from "next";
import Header from "../components/Header";
import LoadingPage from "../loading";

export const metadata: Metadata = {
  title: "Add Recipe",
};
import { Suspense } from "react";
import verifyUser from "@/utils/verifyUser";
import AddRecipeForm from "./components/AddRecipeForm";

const AddRecipe = async () => {
  await verifyUser();

  return (
    <div className="text-center">
      <div className="-mt-12">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <AddRecipeForm />
      </Suspense>
    </div>
  );
};

export default AddRecipe;
