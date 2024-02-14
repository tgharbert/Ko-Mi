declare global {
}
type Recipe = {
  aggregateRating: number;
  author: string;
  categotry: string[];
  cookTime: string;
  description: string;
  id: number;
  image: string;
  instructions: string[];
  ingredients: Ingredient[];
  keywords: Keywords[];
  name: string;
  prepTime: string;
  publisherLogo: string;
  publisherName: string;
  publisherUrl: string;
  recipeYield: number;
  totalTime: string;
  url: string;
};

type Ingredient = {
  id: number;
  name: string;
  locationId: number;
  recipeId: number;
  types: string[];
};

type IngredientEntry = {
  userId: string;
  ingredientId: number;
  name: string;
};

type Keywords = {
  id: number;
  name: string;
  recipeId: number;
};