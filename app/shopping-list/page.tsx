"use server";
import Header from "../components/Header";
import verifyUser from "@/utils/verifyUser";
import AddListItemBar from "./components/NewIngredientBar";
import TopStack from "./components/TopStack";
import IngredientList from "./components/IngredientList";

async function Ingredients() {
  await verifyUser();

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <div>
        <AddListItemBar />
        <div>
          <TopStack />
          <IngredientList />
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
