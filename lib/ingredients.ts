'use server';

import prisma from "@/app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from "@/utils/authOptions"
import { revalidatePath } from "next/cache";
import assignValueToIng from '../utils/assignCustomIng'

export async function getUserIngredients() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    let allIngredients = await prisma.userIngredient.findMany({
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

    const ingredientIds: number[] = allIngredients.map((ingredient) => {
      if (ingredient.ingredientId) {
        return ingredient.ingredientId
      }
    }).filter((id): id is number => id !== undefined)

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

    const ingWithLoc: IngredientWithLocation[] = []

    allIngredients.map((ingredient) => {
      if (ingredient.ingredientId) {
        let newIng = {
          ...ingredient,
          location: locationsObj[ingredient.ingredientId.toString()],
        }
        ingWithLoc.push(newIng)
      } else {
        let newIng = assignValueToIng(ingredient)
        ingWithLoc.push(newIng)
      }
    })
    prisma.$disconnect();

    // order that locations are displayed in
    const desiredLocationOrder = [
      "produce",
      "fish",
      "meat",
      "liquor",
      "spice",
      "baking",
      "beans & rice",
      "asian",
      "pasta",
      "dairy",
      "other",
    ];

    type StringMap = {
      [key: string]: Array<IngredientWithLocation>;
    };
    let locationOrderMap: StringMap = {
      'produce': [],
      'fish': [],
      'meat': [],
      'dairy': [],
      'spice': [],
      'baking': [],
      'liquor': [],
      'beans & rice': [],
      'asian': [],
      'pasta': [],
      'other': [],
    }

    for (let ing in ingWithLoc) {
      let curr = ingWithLoc[ing]
      if (!curr.location) {
        locationOrderMap.other.push(curr)
      } else {
        locationOrderMap[curr.location].push(curr);
      }
    }

    let ordered: IngredientWithLocation[] = [];

    for (let idx in desiredLocationOrder) {
      let currVal = desiredLocationOrder[idx];
      ordered = ordered.concat(locationOrderMap[currVal]);
    }
    return ordered;
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

