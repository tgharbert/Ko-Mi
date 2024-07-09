"use server";
import Header from "../components/Header";
import verifyUser from "@/utils/verifyUser";
import NewIngredientsList from "./components/NewIngredientsList";

async function Ingredients() {
  await verifyUser();

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <NewIngredientsList />
    </div>
  );
}

export default Ingredients;
