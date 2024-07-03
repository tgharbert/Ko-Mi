'use server'

import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

import prisma from "@/app/api/_base"

import modifyIngredientAmount from "@/utils/modifyIngredientAmount";

type LocationsObj = {
  location: string,
}

export async function addIngredients(ingredients: Ingredient[], multiplier: number) {
  try {
    // I could put this somewhere else...
    const session = await getServerSession(authOptions);
    const user = session?.user as User

    let newEntry: IngredientEntry[] = [];

    const ingredientIds = ingredients.map(ingredient => ingredient.id);

    // get all the locations from the Location table where the ingredientId matches the ingredient.id
    const locationsArr = await prisma.location.findMany({
      where: {
        ingredientId: {
          in: ingredientIds
        }
      }
    })

    const locationsObj = locationsArr.reduce((acc: any, location) => {
      if (!acc[location.ingredientId.toString()]) {
        acc[location.ingredientId.toString()] = location.store
      }
      return acc;
    }, {})

    // console.log(locationsObj)

    // console.log(locations)

    if (multiplier === 1) {
      ingredients.map((ingredient: Ingredient) => {
        // let itemLoc = locationsObj[ingredient.id.toString()]
        let entry: IngredientEntry = {
          userId: user?.id || "",
          ingredientId: ingredient.id,
          name: ingredient.name,
          // location: itemLoc,
        };
        newEntry.push(entry);
      });
    } else {
      ingredients.map((ingredient: Ingredient) => {
        // let itemLoc = locationsObj[ingredient.id.toString()]
        let entry: IngredientEntry = {
          userId: user?.id || "",
          ingredientId: ingredient.id,
          name: modifyIngredientAmount(ingredient.name, multiplier),
          // location: itemLoc,
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
