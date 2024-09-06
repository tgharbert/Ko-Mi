'use server'
import prisma from "@/app/api/_base"
import { revalidatePath } from "next/cache";
export default async function deleteUserRecipe(recipeId: number) {
  try {
    let target = Number(recipeId)

    await prisma.ingredient.deleteMany({
      where: {
        recipeId: target,
      },
    });

    await prisma.keyword.deleteMany({
      where: {
        recipeId: target,
      },
    });

    let recipe = await prisma.recipe.delete({
      where: {
        id: target
      },
    })
    await prisma.$disconnect();
    revalidatePath('/')
    return;
    // return new Response()
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}