'use server'
import { auth } from "@/auth";
import prisma from "@/app/api/_base"

export async function addUserRecipe(recipeId: number) {
  try {
    const session = await auth();
    const user = session?.user as User

    const recipe: any = await prisma.recipe.findUnique({
      where: {
        id: recipeId
      }
    })

    if (recipe) {
      let newRecipe: any = {}
      for (let key in recipe) {
        newRecipe[key] = recipe[key]
      }
      delete newRecipe.id
      recipe.userId = user.id
      let added = await prisma.recipe.create({
        data: {...newRecipe}
      });
    }
    await prisma.$disconnect();
    return;
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}
