// "use server";
import AddListItemBar from "./NewIngredientBar";
import TopStack from "./TopStack";
import IngredientList from "./IngredientList";
// import { getUserIngredients } from "@/lib/ingredients";
import { Suspense } from "react";
import Loading from "../loading";

async function IngredientsList() {
  // let ingredients: IngredientWithLocation[] | undefined =
  //   await getUserIngredients();

  return (
    <div>
      <AddListItemBar />
      <div>
        <TopStack />
        {/* <Suspense fallback={<Loading />}> */}
        {/* {ingredients ? (
          <IngredientList ingredients={ingredients} />
        ) : (
          <Loading />
        )} */}
        <IngredientList />
        {/* </Suspense> */}
      </div>
    </div>
  );
}

export default IngredientsList;
