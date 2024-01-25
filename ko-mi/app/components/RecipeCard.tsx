import Image from "next/image";
import AddRecipeButton from "./AddRecipeButton";
// import addRecipe from "../api/addRecipe/route";

// need to refine based on the data model in MVP
type Recipe = {
  title: string;
  author: string;
  description: string;
  name: string;
  keywords: string[];
  instructions: string[];
  recipeIngredient: string[];
  image: string[];
  aggregateRating: number;
  cuisine: string;
  publisher: string;
  recipeYield: number;
  mainEntityOfPage: boolean;
  totalTime: string;
  cookTime: string;
  prepTime?: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  // const submitRecipe = (recipe: Recipe) => {
  //   addRecipe(recipe);
  // };

  const handleRecipeSubmission = async () => {
    try {
      const response = await fetch("/api/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      const data = await response.json();
      console.log("recipe card");
    } catch (error) {
      console.error(error);
    }
  };

  // const handlePostSubmit = async () => {
  //   try {
  //     const response = await fetch("/api/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(postData),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };

  return (
    <div className="mr-20 ml-20">
      <div>
        <h1 className="text-xl pt-4">{recipe.name}</h1>
      </div>
      <div className="pt-4 pb-4 flex items-center justify-center">
        <Image
          width="400"
          height="400"
          src={recipe.image[0]}
          alt="recipe-photo"
          className="rounded-lg"
        />
      </div>
      <div className="pt-4 pb-4">
        <p>Description: </p>
        <p>{recipe.description}</p>
      </div>
      <div className="pt-4 pb-4">
        <p>Ingredients: </p>
        <ul>
          {recipe.recipeIngredient.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>
      {/* <AddRecipeButton /> */}
      <div className="mx-4 pb-10">
        <button
          onClick={() => handleRecipeSubmission()}
          className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
