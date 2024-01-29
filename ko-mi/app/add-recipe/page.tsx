import RecipeURLForm from "../components/add-recipe/RecipeURLForm";
import Header from "../components/Header";

const AddRecipe = () => {
  return (
    <div className="text-center">
      <div className="-mt-9">
        <Header />
      </div>
      <RecipeURLForm />
    </div>
  );
};

export default AddRecipe;
