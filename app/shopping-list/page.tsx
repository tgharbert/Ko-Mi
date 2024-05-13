import Header from "../components/Header";
import IngredientsList from "../components/ingredients/IngredientsList";
// import AddListItemBar from "../components/ingredients/NewIngredientBar";
// import { Suspense } from "react";
import LoadingPage from "../loading";
import verifyUser from "@/utils/verifyUser";
import NewIngredientsList from "../components/ingredients/NewIngredientsList";
import { getUserIngredients } from "@/lib/ingredients";

async function Ingredients() {
  await verifyUser();

  const ingredients: Ingredient[] = await getUserIngredients();

  return (
    <div className="text-center pb-10">
      <div className="-mt-9">
        <Header />
      </div>
      {/* <AddListItemBar /> */}
      {/* <Suspense fallback={<LoadingPage />}> */}
      {/* <NewIngredientsList /> */}
      {ingredients ? <IngredientsList ingredients={ingredients} /> : <></>}
      {/* <IngredientsList ingredients={ingredients} /> */}
    </div>
  );
}

export default Ingredients;
