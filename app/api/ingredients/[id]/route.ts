import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";

// PATCH - Update ingredient (check/uncheck)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { checked } = body;

    if (typeof checked !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const ingredient = await prisma.userIngredient.update({
      where: { id: parseInt(id) },
      data: { checked },
    });

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error("Error updating ingredient:", error);
    return NextResponse.json(
      { error: "Failed to update ingredient" },
      { status: 500 }
    );
  }
}

// DELETE - Delete single ingredient
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.userIngredient.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return NextResponse.json(
      { error: "Failed to delete ingredient" },
      { status: 500 }
    );
  }
}
