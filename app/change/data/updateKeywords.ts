'use server'
import prisma from "@/app/api/_base"
import { revalidatePath } from "next/cache";
export default async function updateKeywords(recipeId: number, keywords: string[]) {
  try {
    let target = Number(recipeId)
    await prisma.keyword.deleteMany({
      where: {
        recipeId: target
      }
    });

    const newIngredients = await prisma.keyword.createMany({
      data: keywords.map((keyword) => ({
        name: keyword,
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
