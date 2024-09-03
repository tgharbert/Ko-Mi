'use server'
import prisma from "@/app/api/_base"
export default async function updateName(recipeId: number, name: string) {
  try {
    let target = Number(recipeId)
    let recipe = await prisma.recipe.update({
      where: {
        id: target
      },
      data: {
        name: name
      }
    })
    await prisma.$disconnect();
    return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}
