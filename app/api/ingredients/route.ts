import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";

// GET all ingredients for user
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        ingredients: {
          orderBy: { id: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}

// POST - Add ingredients (bulk or single item)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    console.log("Session:", session);

    if (!session?.user?.email) {
      console.log("Unauthorized: No session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Request body:", body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log("User not found:", session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Single item addition
    if (body.item && typeof body.item === "string") {
      console.log("Creating ingredient:", body.item);
      const ingredient = await prisma.userIngredient.create({
        data: {
          name: body.item,
          userId: user.id,
          checked: false,
        },
      });
      console.log("Ingredient created:", ingredient);
      return NextResponse.json(ingredient);
    }

    // Bulk addition
    if (body.ingredients && Array.isArray(body.ingredients)) {
      const ingredientsData = body.ingredients.map((ing: any) => ({
        name: ing.name,
        userId: user.id,
        checked: false,
      }));

      const result = await prisma.userIngredient.createMany({
        data: ingredientsData,
      });

      return NextResponse.json({ count: result.count });
    }

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error adding ingredients:", error);
    return NextResponse.json(
      { error: "Failed to add ingredients" },
      { status: 500 }
    );
  }
}

// DELETE - Delete all or checked ingredients
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const deleteAll = searchParams.get("deleteAll");
    const deleteChecked = searchParams.get("deleteChecked");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (deleteAll === "true") {
      const result = await prisma.userIngredient.deleteMany({
        where: { userId: user.id },
      });
      return NextResponse.json({ count: result.count });
    }

    if (deleteChecked === "true") {
      const result = await prisma.userIngredient.deleteMany({
        where: { userId: user.id, checked: true },
      });
      return NextResponse.json({ count: result.count });
    }

    return NextResponse.json(
      { error: "Invalid delete operation" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deleting ingredients:", error);
    return NextResponse.json(
      { error: "Failed to delete ingredients" },
      { status: 500 }
    );
  }
}
