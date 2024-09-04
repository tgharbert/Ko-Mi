'use server'
import prisma from "@/app/api/_base"
import { revalidatePath } from "next/cache";
export default async function updateIngredients(recipeId: number, ingredients: string[]) {
  try {
    let target = Number(recipeId)
    await prisma.ingredient.deleteMany({
      where: {
        recipeId: target
      }
    });

    const newIngredients = await prisma.ingredient.createMany({
      data: ingredients.map((ingredient) => ({
        name: ingredient,
        recipeId: target,
      })),
    });
    await prisma.$disconnect();
    revalidatePath(`/change/${recipeId}`)
    return
    // return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.error("ERROR updating name: ", error);
    return new Response();
  }
}
