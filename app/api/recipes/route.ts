import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import getRecipeObject from "@/utils/parseRecipe";
import getData from "@/utils/scraper";

// GET recipes - list with filtering and pagination
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "name";
    const page = parseInt(searchParams.get("page") || "1");
    const random = searchParams.get("random") === "true";
    const all = searchParams.get("all") === "true";

    const pageSize = 12;
    const skip = (page - 1) * pageSize;

    let whereClause: any = { userId: user.id };

    if (query && query !== "") {
      if (category === "name") {
        whereClause.name = { contains: query, mode: "insensitive" };
      } else if (category === "keyword") {
        whereClause.keywords = {
          some: { name: { contains: query, mode: "insensitive" } },
        };
      }
    }

    let orderBy: any = random ? undefined : { id: "desc" };

    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      include: {
        keywords: true,
        ingredients: true,
      },
      orderBy,
      skip: all ? undefined : skip,
      take: all ? undefined : pageSize,
    });

    // Shuffle if random
    if (random) {
      recipes.sort(() => Math.random() - 0.5);
    }

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

// POST - Create a new recipe from URL
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { url, multiplier = 1, category = [], keywords = [] } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Scrape and parse recipe from URL
    const scrapedData = await getData(url);
    if (!scrapedData) {
      return NextResponse.json(
        { error: "Failed to scrape recipe from URL" },
        { status: 400 }
      );
    }

    const recipeData = getRecipeObject(scrapedData);

    if (!recipeData) {
      return NextResponse.json(
        { error: "Failed to parse recipe data" },
        { status: 400 }
      );
    }

    // Create recipe with relations
    const recipe = await prisma.recipe.create({
      data: {
        url: recipeData.url,
        author: recipeData.author || "",
        description: recipeData.description || "",
        name: recipeData.name,
        instructions: recipeData.instructions || [],
        image: recipeData.image || "",
        aggregateRating: recipeData.aggregateRating,
        category: Array.isArray(category) ? category : [category],
        publisherName: recipeData.publisherName,
        publisherUrl: recipeData.publisherUrl,
        publisherLogo: recipeData.publisherLogo,
        recipeYield: recipeData.recipeYield || 1,
        totalTime: recipeData.totalTime || "",
        cookTime: recipeData.cookTime || "",
        prepTime: recipeData.prepTime || "",
        userId: user.id,
        keywords: {
          create: keywords.map((kw: string) => ({ name: kw })),
        },
        ingredients: {
          create: recipeData.recipeIngredient?.map((ingredient: string) => ({
            name: ingredient,
          })) || [],
        },
      },
      include: {
        keywords: true,
        ingredients: true,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
