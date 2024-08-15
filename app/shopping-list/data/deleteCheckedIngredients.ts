'use server'
import { revalidatePath } from "next/cache"
import prisma from "../../api/_base"

export async function deleteCheckedIngredients (id: string) {
  try {
    prisma.userIngredient.deleteMany({
      where: {
        checked: true,
        userId: id
      }
    })
    revalidatePath('/shopping-list')
  } catch (error) {
    console.error(error)
  }
}