"use server";
import Header from "../components/Header";
import verifyUser from "@/utils/verifyUser";
import NewIngredientsList from "./components/NewIngredientsList";
import { getUserIngredients } from "@/lib/ingredients";
import { addItemToList } from "@/lib/addItemToList";

async function Ingredients() {
  let ingredients = await getUserIngredients();
  await verifyUser();

  const submitItem = async (item: string) => {
    "use server";
    if (!item) {
      return;
    }
    await addItemToList(item);
  };

  const getIngredients = async () => {
    "use server";
    let ingredients = await getUserIngredients();
    return ingredients;
  };

  return (
    <div className="text-center pb-10">
      <div className="-mt-9">
        <Header />
      </div>
      <NewIngredientsList
        ingredients={ingredients}
        submitItem={submitItem}
        getIngredients={getIngredients}
      />
    </div>
  );
}

export default Ingredients;
