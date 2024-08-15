'use server'
import { revalidatePath } from "next/cache"
import prisma from "../../api/_base"

export async function deleteUserIngredients(id: string) {
  try {
    const deletedIngredients = await prisma.userIngredient.deleteMany({
      where: { userId: id },
    });
    revalidatePath('/shopping-list')
    return deletedIngredients;
  } catch (error) {
    console.error("ERROR DELETING ALL INGREDIENTS: ", error);
  }
}
