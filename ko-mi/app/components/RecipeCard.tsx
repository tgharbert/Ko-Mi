import Image from "next/image";

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
  return (
    <div className="mr-20 ml-20">
      <div>
        <h1 className="text-xl pt-4">{recipe.name}</h1>
      </div>
      <div className="pt-4 pb-4">
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
    </div>
  );
};

export default RecipeCard;
