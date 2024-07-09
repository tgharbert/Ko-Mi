import AddListItemBar from "./NewIngredientBar";
import TopStack from "./TopStack";
import IngredientList from "./IngredientList";

async function IngredientsList() {
  return (
    <div>
      <AddListItemBar />
      <div>
        <TopStack />
        <IngredientList />
      </div>
    </div>
  );
}

export default IngredientsList;
