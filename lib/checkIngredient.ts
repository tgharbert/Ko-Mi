'use server'
import prisma from "../app/api/_base"

export async function checkIngredient (targetId: number, bool: boolean) {
  console.log(bool)
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
    // console.log(removedIngredient)
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
    // console.log(removedIngredient)
    await prisma.$disconnect();
  }
    // return new Response();
  } catch (error) {
    console.error(error)
  }
}