'use server'

import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

import prisma from "@/app/api/_base"

import modifyIngredientAmount from "@/utils/modifyIngredientAmount";

export async function addIngredients(ingredients: Ingredient[], multiplier: number) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User

    let newEntry: IngredientEntry[] = [];

    if (multiplier === 1) {
      ingredients.map((ingredient: Ingredient) => {
        let entry: IngredientEntry = {
          userId: user?.id || "",
          ingredientId: ingredient.id,
          name: ingredient.name,
        };
        newEntry.push(entry);
      });
    } else {
      ingredients.map((ingredient: Ingredient) => {
        let entry: IngredientEntry = {
          userId: user?.id || "",
          ingredientId: ingredient.id,
          name: modifyIngredientAmount(ingredient.name, multiplier),
        };
        newEntry.push(entry);
      });
    }
    const newIngredients = await prisma.userIngredient.createMany({
      data: newEntry,
    });
    return;
  } catch (error) {
    console.error(error);
    return `ERROR: ${error}`
  }
}
