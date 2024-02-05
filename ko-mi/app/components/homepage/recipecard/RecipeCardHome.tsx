import Image from "next/image";
import Keywords from "./Keywords";
import RecipeCardImage from "./RecipeCardImage";

type Recipe = {
  aggregateRating: number;
  author: string;
  categotry: string[];
  cookTime: string;
  description: string;
  id: number;
  image: string;
  instructions: string[];
  keywords: string[];
  name: string;
  prepTime: string;
  publisherLogo: string;
  publisherName: string;
  publisherUrl: string;
  recipeYield: string;
  totalTime: string;
  url: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  console.log(recipe);
  return (
    <div className="flex justify-center">
      <div className="items-center justify-center">
        <RecipeCardImage image={recipe.image} name={recipe.name} />
      </div>
      <div className="w-3/5">
        <h3 className="">{recipe.name}</h3>
        <div className="">
          <p>{recipe.description}</p>
        </div>
        <button>Show More...</button>
        <Keywords keywords={recipe.keywords} />
      </div>
    </div>
  );
};

export default RecipeCard;
