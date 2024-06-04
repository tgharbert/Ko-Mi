'use server'
import { revalidatePath } from "next/cache"
import prisma from "../app/api/_base"

export async function deleteCheckedIngredients () {
  try {
    prisma.userIngredient.deleteMany({
      where: {
        checked: true
      }
    })
    revalidatePath('/shopping-list')
  } catch (error) {
    console.error(error)
  }
}