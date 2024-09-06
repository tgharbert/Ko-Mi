'use server'
import prisma from "@/app/api/_base"
import { revalidatePath } from "next/cache";
export default async function updateMethods(recipeId: number, methods: string[]) {
  try {
    let target = Number(recipeId)
    await prisma.recipe.update({
      where: {
        id: target,
      },
      data: {
        instructions: methods
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
