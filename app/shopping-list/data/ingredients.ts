'use server';
import prisma from "@/app/api/_base"
import { matchLocation } from "@/utils/matchIngredientLocation";
import { STORE_LOCATIONS } from "@/utils/ingredientMap";

export async function getUserIngredients (id: string) {
  try {
    let allIngredients = await prisma.userIngredient.findMany({
      where: {
        userId: id,
        checked: false
      },
      select: {
        id: true,
        ingredientId: true,
        name: true,
        checked: true,
      },
    });

    // TIME TEST FOR ORDERED VS ALL -- ORDERING TAKES ABOUT 250 MS
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
        let newIng = { ...ingredient, location: matchLocation(ingredient.name || "") }
        ingWithLoc.push(newIng)
      }
    })

    const locationOrderMap: Record<string, IngredientWithLocation[]> = {};
    for (const loc of STORE_LOCATIONS) {
      locationOrderMap[loc] = [];
    }

    for (let ing in ingWithLoc) {
      let curr = ingWithLoc[ing]
      if (!curr.location) {
        locationOrderMap.other.push(curr)
      } else if (locationOrderMap[curr.location]) {
        locationOrderMap[curr.location].push(curr);
      } else {
        locationOrderMap.other.push(curr);
      }
    }

    let ordered: IngredientWithLocation[] = [];

    for (const loc of STORE_LOCATIONS) {
      ordered = ordered.concat(locationOrderMap[loc]);
    }
    return ordered;
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}
