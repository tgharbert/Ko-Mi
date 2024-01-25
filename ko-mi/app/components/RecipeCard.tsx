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
    <div>
      <div>
        <h1>{recipe.name}</h1>
      </div>
      <div className="flexbox">
        <Image
          width="100"
          height="100"
          src={recipe.image[0]}
          alt="recipe-photo"
          className=""
        />
      </div>
      <div>
        <p>Description: </p>
        <p>{recipe.description}</p>
      </div>
      <div className="pt-4">
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
