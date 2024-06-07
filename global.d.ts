declare global {
}
type Recipe = {
  aggregateRating: number;
  author: string;
  category: string[];
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

type CustomRecipe = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  keywords: string[];
  photoFile: fileObject;
  servingSize: string;
  cookTime: string;
  // photoFile: string;
}

type Ingredient = {
  id: number;
  name: string;
  locationId: number;
  recipeId: number;
  types: string[];
  checked: boolean;
};

type IngredientEntry = {
  userId: string;
  ingredientId: number;
  name: string;
};

type Keywords = {
  id: number;
  name: string;
  recipeId: number?;
};


type RawRecipe = {
  aggregateRating: number;
  author: string;
  category: string[];
  cookTime: string;
  description: string;
  id: number;
  image: string;
  instructions: string[];
  recipeIngredient: string[];
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

type User = {
  name: string;
  email: string;
  image: string;
  id: string;
}

type AddedIngredient = {
  name: string;
  checked: boolean;
  ingredientId: number;
  id: number;
}[]

type Friend = {
  email: string;
  emailVerified: boolean;
  id: string;
  image: string;
  name: string;
  direction: string;
};

type UserData = {
  email: string | null;
  emailVerified: Date | null;
  id: string;
  image: string | null;
  name: string | null;
}

// { id: string; name: string | null; email: string | null; emailVerified: Date | null; image: string | null; }[]