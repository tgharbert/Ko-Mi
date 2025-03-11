'use server'

import prisma from "@/app/api/_base"

export async function addItemToList (item: string, id: string) {
  try {
    await prisma.userIngredient.create({
      data: {
        name: item,
        userId: id || "",
      }
    })
  } catch (error) {
    console.error("Error adding ingredient to list: ", error)
  }
}