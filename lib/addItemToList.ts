'use server'

import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'
import { revalidatePath } from "next/cache";
import prisma from "@/app/api/_base"

export async function addItemToList (item: string) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User
    const result = await prisma.userIngredient.create({
      data: {
        name: item,
        userId: user?.id || "",
        // ingredientId: -1,
      }
    })
    revalidatePath('/shopping-list')
  } catch (error) {
    console.error("Error adding ingredient to list: ", error)
  }
}