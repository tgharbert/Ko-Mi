import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";

// POST - Share ingredients with friend
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
    const { friendId, ingredients } = body;

    if (!friendId || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Create ingredients for the friend
    const ingredientsData = ingredients.map((name: string) => ({
      name,
      userId: friendId,
      checked: false,
    }));

    await prisma.userIngredient.createMany({
      data: ingredientsData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sharing ingredients:", error);
    return NextResponse.json(
      { error: "Failed to share ingredients" },
      { status: 500 }
    );
  }
}
