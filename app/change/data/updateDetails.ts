'use server'
import prisma from "@/app/api/_base"
import { revalidatePath } from "next/cache";
export default async function updateDetails(description: string, recipeYield: string, time: string, recipeId: number) {
  const target = Number(recipeId)
  try {
    let recipe = await prisma.recipe.update({
      where: {
        id: target
      },
      data: {
        description: description,
        recipeYield: Number(recipeYield),
        cookTime: time,
      }
    })
    await prisma.$disconnect();
    revalidatePath(`/change/${recipeId}`)
    return
  } catch (error) {
    console.error("ERROR updating name: ", error);
    return new Response();
  }
}
