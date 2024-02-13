'use server';

import prisma from "@/app/api/_base"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function getUserIngredients() {
  try {
    // should this be passed a userId??
    const session = await getServerSession(authOptions);
    const user = session?.user || "";
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
    return new Response("Error retrieving data");
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
    return deletedIngredients;
  } catch (error) {
    console.error("ERROR DELETING ALL INGREDIENTS: ", error);
  }
}
