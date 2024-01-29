import { PrismaClient } from "@prisma/client";
// import { stringify } from "querystring";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const recipe = await req.json();
  const newRecipe = prisma.recipe.create({
    data: {
      url: recipe.url || "No URL",
      author: recipe.author,
      description: recipe.description,
      name: recipe.name,
      keywords: recipe.keywords,
      ingredients: {
        create: recipe.recipeIngredient.map((ingredient: string) => ({
          name: ingredient,
        })),
      },
      instructions: recipe.instructions,
      image: recipe.image,
      aggregateRating: recipe.aggregateRating,
      publisherName: recipe.publisherName,
      publisherLogo: recipe.publisherLogo,
      publisherUrl: recipe.publisherUrl,
      recipeYield: recipe.recipeYield,
      totalTime: recipe.totalTime || "Value not assigned",
      cookTime: recipe.cookTime || "Value not assigned",
      category: recipe.recipeCategory || ["Value not assigned"],
      prepTime: recipe.prepTime || "Value not assigned",
    },
  });
  await newRecipe
    .then((newRecipe) => {
      console.log("NEW RECIPE: ", newRecipe);
      return new Response(JSON.stringify("finished"));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      return new Response("ERROR: ", error);
    });
  return new Response(JSON.stringify(newRecipe));
}
