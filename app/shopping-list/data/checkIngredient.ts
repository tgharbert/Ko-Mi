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
    await prisma.$disconnect();
  } else {
    const removedIngredient = await prisma.userIngredient.update({
      where: {
        id: targetId,
      },
      data: {
        checked: false
      }
    })
    await prisma.$disconnect();
  }
  } catch (error) {
    console.error(error)
  }
}