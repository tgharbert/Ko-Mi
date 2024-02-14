'use server'
// import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/api/_base"

export async function addRecipe(input: any) {
  // console.log(recipe)
  console.log('hit')
  try {
    const recipe = await input.json();
    // console.log(typeof input)
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email || "";
    // const recipe = data.recipe;
    recipe.keywords = recipe.keywords || ["No available keywords"]
    recipe.instructions = recipe.keywords || ['No available instructions']



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
    await prisma.$disconnect();
    // console.log("HHHHHHHHHHHHHHHHHHH")
    console.log(newRecipe)
    return new Response();

    return;
    // return new Response('success!');
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}
