'use server';

import prisma from "@/app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from "@/utils/authOptions"

export async function shareIngredients(friendId: string) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    const allIngredients = await prisma.userIngredient.findMany({
      where: {
        userId: user?.id,
        checked: false
      },
      select: {
        id: true,
        ingredientId: true,
        name: true,
        checked: true,
      },
    });

    console.log(allIngredients)

    if (allIngredients.length === 0) {
      return 'no ingredients';
    }

    let newEntry: IngredientEntry[] = [];

    allIngredients.map((ingredient) => {
        let entry: IngredientEntry = {
          userId: friendId || "",
          ingredientId: ingredient.ingredientId || null,
          name: ingredient.name || "",
        }
        newEntry.push(entry);
    });

    await prisma.userIngredient.createMany({
      data: newEntry,
    });

    prisma.$disconnect();
    return 'success';
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}
