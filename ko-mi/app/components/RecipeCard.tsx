import Image from "next/image";

// need to refine based on the data model in MVP
type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  imageURL: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div>
      <div>
        <h1>{recipe.name}</h1>
      </div>
      <div>
        <Image src={recipe.imageURL} alt="recipe-photo" />
      </div>
      <div>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
};
