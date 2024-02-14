'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/api/_base"
import parseIngredientAmount from "@/utils/numberParser";

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
        // need to work on adding the multiplier
        // should get the multiplier from the client and then apply here?
        // parseNumberAmount
        name: ingredient.name,
      };
      newEntry.push(entry);
    });

    const newIngredients = await prisma.userIngredient.createMany({
      data: newEntry,
    });
    console.log(newIngredients);
    return;
    // return new Response(JSON.stringify(newIngredients));
  } catch (error) {
    console.error(error);
    return new Response("ERROR: ", error);
  }
}
