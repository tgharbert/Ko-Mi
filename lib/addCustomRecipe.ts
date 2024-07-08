'use server'
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'
import prisma from "@/app/api/_base"

export async function addCustomRecipe(recipe: any) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User

    recipe.keywords = recipe.keywords || ["No available keywords"]
    recipe.instructions = recipe.instructions || ['No available instructions']

      const newRecipe = await prisma.recipe.create({
        data: {
          url: recipe.url || recipe.name,
          author: user?.name || 'no provided username',
          description: recipe.description,
          name: recipe.name,
          keywords: {
          create: recipe.keywords.map((keyword: string) => ({
            name: keyword
          }))
        },
        ingredients: {
          create: recipe.ingredients.map((ingredient: string) => ({
            name: ingredient,
          })),
        },
        instructions: recipe.instructions,
        users: { connect: { id: user?.id } },
        image: recipe.photoFile,
        // aggregateRating: recipe.aggregateRating,
        // publisherName: recipe.publisherName,
        // publisherLogo: recipe.publisherLogo,
        // publisherUrl: recipe.publisherUrl,
        recipeYield: Number(recipe.servingSize),
        totalTime: recipe.totalTime || "Value not assigned",
        cookTime: recipe.cookTime || "Value not assigned",
        category: recipe.recipeCategory || ["Value not assigned"],
        prepTime: recipe.prepTime || "Value not assigned",
      },
    });
    await prisma.$disconnect();
    return;
  } catch (error) {
    console.error("ERROR: ", error);
    // return new Response();
    return;
  }
}
