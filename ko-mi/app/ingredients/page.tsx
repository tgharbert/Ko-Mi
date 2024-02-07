import Header from "../components/Header";
import IngredientsList from "../components/ingredients/IngredientsList";

const Ingredients = () => {
  return (
    <div className="text-center">
      <div className="-mt-9">
        <Header />
      </div>
      <h2 className="pb-4">Your Current Shopping List:</h2>
      <IngredientsList />
    </div>
  );
};

export default Ingredients;
