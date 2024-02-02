import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const allRecipes = await prisma.recipe.findMany();
  // console.log("All Recipes: ", allRecipes);
  return new Response(JSON.stringify(allRecipes));
}
