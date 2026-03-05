import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { matchLocation } from "@/utils/matchIngredientLocation";
import consolidateIngredients from "@/utils/consolidateIngredients";
import { STORE_LOCATIONS } from "@/utils/ingredientMap";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch unchecked ingredients
    const allIngredients = await prisma.userIngredient.findMany({
      where: { userId: user.id, checked: false },
      select: { id: true, ingredientId: true, name: true, checked: true },
    });

    // Build location data
    const ingredientIds = allIngredients
      .map((ing) => ing.ingredientId)
      .filter((id): id is number => id !== undefined && id !== null);

    const locationsArr = await prisma.location.findMany({
      where: { ingredientId: { in: ingredientIds } },
    });

    const locationsObj: Record<string, string> = {};
    for (const loc of locationsArr) {
      locationsObj[loc.ingredientId.toString()] = loc.store;
    }

    const ingWithLoc: IngredientWithLocation[] = allIngredients.map((ingredient) => {
      if (ingredient.ingredientId) {
        return {
          ...ingredient,
          location: locationsObj[ingredient.ingredientId.toString()] || "other",
        };
      }
      return { ...ingredient, location: matchLocation(ingredient.name || "") };
    });

    const consolidated = consolidateIngredients(ingWithLoc);

    // Nothing to consolidate if count didn't change
    if (consolidated.length === allIngredients.length) {
      return NextResponse.json({ ingredients: sortByLocation(ingWithLoc) });
    }

    // Transaction: delete old rows, insert merged ones
    await prisma.$transaction(async (tx) => {
      const oldIds = allIngredients.map((ing) => ing.id);
      await tx.userIngredient.deleteMany({
        where: { id: { in: oldIds } },
      });

      await tx.userIngredient.createMany({
        data: consolidated.map((item) => ({
          userId: user.id,
          name: item.name,
          checked: false,
        })),
      });
    });

    // Fetch the newly created ingredients to return with proper IDs
    const newIngredients = await prisma.userIngredient.findMany({
      where: { userId: user.id, checked: false },
      select: { id: true, ingredientId: true, name: true, checked: true },
    });

    const newIngWithLoc: IngredientWithLocation[] = newIngredients.map((ingredient) => ({
      ...ingredient,
      location: matchLocation(ingredient.name || ""),
    }));

    return NextResponse.json({ ingredients: sortByLocation(newIngWithLoc) });
  } catch (error) {
    console.error("Error consolidating ingredients:", error);
    return NextResponse.json(
      { error: "Failed to consolidate ingredients" },
      { status: 500 }
    );
  }
}

function sortByLocation(ingredients: IngredientWithLocation[]): IngredientWithLocation[] {
  const locationOrderMap: Record<string, IngredientWithLocation[]> = {};
  for (const loc of STORE_LOCATIONS) {
    locationOrderMap[loc] = [];
  }
  for (const ing of ingredients) {
    const loc = ing.location || "other";
    if (locationOrderMap[loc]) {
      locationOrderMap[loc].push(ing);
    } else {
      locationOrderMap["other"].push(ing);
    }
  }
  const ordered: IngredientWithLocation[] = [];
  for (const loc of STORE_LOCATIONS) {
    ordered.push(...locationOrderMap[loc]);
  }
  return ordered;
}
