'use server'
import prisma from "@/app/api/_base";

export async function checkIngredient (targetId: number, bool: boolean) {
  try {
    if (bool === false) {
    const removedIngredient = await prisma.userIngredient.update({
      where: {
        id: targetId,
      },
      data: {
        checked: true
      }
    })
  } else {
    const removedIngredient = await prisma.userIngredient.update({
      where: {
        id: targetId,
      },
      data: {
        checked: false
      }
    })
  }
  } catch (error) {
    console.error(error)
  }
}