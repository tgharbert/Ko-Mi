import RecipeURLForm from "../components/RecipeURLForm";
import Header from "../components/Header";
import getData from "./scraper";

// how to pass data from one page to another?

const AddRecipe = () => {
  return (
    <div className="text-center">
      <div className="-mt-9">
        <Header />
      </div>
      <h1>Add Recipe</h1>
      <RecipeURLForm />
    </div>
  );
};

export default AddRecipe;
