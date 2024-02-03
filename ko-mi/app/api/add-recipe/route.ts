import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// this needs to be saving the recipe to the user as well -
export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const recipe = data.recipe;
  const userEmail = data.user.email;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // should be await then it will kill the whole promise thing further down
  const newRecipe = prisma.recipe.upsert({
    where: {
      url: recipe.url,
    },
    update: {
      users: { connect: { id: user?.id } },
    },
    create: {
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
      users: { connect: { id: user?.id } },
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
      // console.log("NEW RECIPE: ", newRecipe);
      return new Response(JSON.stringify("finished"));
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      return new Response("ERROR: ", error);
    });
  return new Response(JSON.stringify(newRecipe));
}
