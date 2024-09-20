'use server'
import prisma from "@/app/api/_base"
import { revalidatePath } from "next/cache";
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
    revalidatePath(`/change/${recipeId}`)
    return
  } catch (error) {
    console.error("ERROR updating name: ", error);
    return new Response();
  }
}
