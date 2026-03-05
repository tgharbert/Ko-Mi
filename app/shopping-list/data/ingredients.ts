'use server';
import prisma from "@/app/api/_base"
import { matchLocation } from "@/utils/matchIngredientLocation";
import { STORE_LOCATIONS } from "@/utils/ingredientMap";

export async function getUserIngredients (id: string) {
  try {
    const allIngredients = await prisma.userIngredient.findMany({
      where: {
        userId: id,
        checked: false,
      },
      select: {
        id: true,
        ingredientId: true,
        name: true,
        checked: true,
        ingredient: {
          select: {
            location: {
              select: { store: true },
            },
          },
        },
      },
    });

    const ingWithLoc: IngredientWithLocation[] = allIngredients.map((ing) => {
      const store = ing.ingredient?.location?.store;
      return {
        id: ing.id,
        ingredientId: ing.ingredientId,
        name: ing.name,
        checked: ing.checked,
        location: store || matchLocation(ing.name || ""),
      };
    });

    const locationOrderMap: Record<string, IngredientWithLocation[]> = {};
    for (const loc of STORE_LOCATIONS) {
      locationOrderMap[loc] = [];
    }

    for (const curr of ingWithLoc) {
      const loc = curr.location || "other";
      if (locationOrderMap[loc]) {
        locationOrderMap[loc].push(curr);
      } else {
        locationOrderMap.other.push(curr);
      }
    }

    const ordered: IngredientWithLocation[] = [];
    for (const loc of STORE_LOCATIONS) {
      ordered.push(...locationOrderMap[loc]);
    }
    return ordered;
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}
