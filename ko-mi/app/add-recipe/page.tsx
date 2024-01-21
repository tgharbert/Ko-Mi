import RecipeURLForm from "../components/RecipeURLForm";
import Header from "../components/Header";
import getData from "./scraper";

// const testURL =
//   "https://www.bonappetit.com/recipe/slow-roast-gochujang-chicken";

// getData(testURL);

const AddRecipe = () => {
  return (
    <div className="text-center">
      <Header />
      <h1>Add Recipe</h1>
      <RecipeURLForm />
    </div>
  );
};

export default AddRecipe;
