import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const allRecipes = await prisma.recipe.findMany();
  return new Response(JSON.stringify(allRecipes));
}
