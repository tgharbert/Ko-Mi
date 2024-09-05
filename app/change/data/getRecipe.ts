'use server'
import prisma from "@/app/api/_base"
export default async function getUserRecipe(recipeId: number) {

  try {
    let target = Number(recipeId)
    let recipe = await prisma.recipe.findUnique({
      where: {
        id: target
      },
      include: {
        ingredients: true,
        keywords: true,
      },
    })
    await prisma.$disconnect();
    return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}