import Header from "../components/Header";
import IngredientsList from "../components/ingredients/IngredientsList";

const Ingredients = () => {
  return (
    <div className="text-center">
      <div className="-mt-9">
        <Header />
      </div>
      <h1>Ingredients</h1>
      <IngredientsList />
    </div>
  );
};

export default Ingredients;
