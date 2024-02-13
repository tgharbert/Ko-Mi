'use server'
import prisma from "../app/api/_base"

export async function deleteCheckedIngredients () {
  try {
    prisma.userIngredient.deleteMany({
      where: {
        checked: true
      }
    })
  } catch (error) {
    console.error(error)
  }
}