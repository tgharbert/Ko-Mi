'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/api/_base"

import modifyIngredientAmount from "@/utils/modifyIngredientAmount";

export async function addIngredients(ingredients: Ingredient[], multiplier: number) {
  try {
    // I could put this somewhere else...
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    let newEntry: IngredientEntry[] = [];

    ingredients.map((ingredient: any) => {
      let entry: IngredientEntry = {
        userId: user?.id || "",
        ingredientId: ingredient.id,
        name: modifyIngredientAmount(ingredient.name, multiplier),
      };
      newEntry.push(entry);
    });

    const newIngredients = await prisma.userIngredient.createMany({
      data: newEntry,
    });
    return;
  } catch (error) {
    console.error(error);
    return `ERROR: ${error}`
  }
}
