'use server'
import prisma from "@/app/api/_base"
export default async function updatePhoto(recipeId: number, address: string) {
  try {
    let target = Number(recipeId)
    let recipe = await prisma.recipe.update({
      where: {
        id: target
      },
      data: {
        image: address
      }
    })
    await prisma.$disconnect();
    return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}