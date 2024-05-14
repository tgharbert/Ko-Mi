import Header from "../components/Header";
import IngredientsList from "./components/IngredientsList";
// import AddListItemBar from "../components/ingredients/NewIngredientBar";
// import { Suspense } from "react";
import LoadingPage from "../loading";
import verifyUser from "@/utils/verifyUser";
import NewIngredientsList from "./components/NewIngredientsList";
import { getUserIngredients } from "@/lib/ingredients";

async function Ingredients() {
  let ingredients: Ingredient[] = await getUserIngredients();
  await verifyUser();
  // console.log(ingredients);

  return (
    <div className="text-center pb-10">
      <div className="-mt-9">
        <Header />
      </div>
      {/* <AddListItemBar /> */}
      {/* <Suspense fallback={<LoadingPage />}> */}
      <NewIngredientsList ingredients={ingredients} />
      {/* {ingredients ? <IngredientsList ingredients={ingredients} /> : <></>} */}
      {/* <IngredientsList /> */}
    </div>
  );
}

export default Ingredients;
