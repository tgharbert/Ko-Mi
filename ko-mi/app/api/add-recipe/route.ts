import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email || "";
    const recipe = data.recipe;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    const newRecipe = await prisma.recipe.upsert({
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
        keywords: {
          create: recipe.keywords.map((keyword: string) => ({
            name: keyword
          }))
        },
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
    return new Response(JSON.stringify(newRecipe));
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response("ERROR: ", error);
  }
}
