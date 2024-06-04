'use server';

import prisma from "@/app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from "@/utils/authOptions"
import { revalidatePath } from "next/cache";

export async function getUserIngredients() {
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
    prisma.$disconnect();
    return allIngredients;
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}

export async function deleteUserIngredients() {
  try {
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email || "";

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    const deletedIngredients = await prisma.userIngredient.deleteMany({
      where: { userId: user?.id },
    });
    revalidatePath('/shopping-list')
    return deletedIngredients;
  } catch (error) {
    console.error("ERROR DELETING ALL INGREDIENTS: ", error);
  }
}
