import RecipeURLForm from "../components/RecipeURLForm";
import Header from "../components/Header";
import ldScraper from "./scraper";
import { get } from "http";

const testURL =
  "https://www.bonappetit.com/recipe/slow-roast-gochujang-chicken";

// const result = ldScraper(testURL);
const getData = async (url: string) => {
  try {
    const result = await ldScraper(url);
    console.log("now here's the thing", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const AddRecipe = () => {
  return (
    <div>
      <Header />
      <h1>Add Recipe</h1>
      <RecipeURLForm />
    </div>
  );
};

export default AddRecipe;
