import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import RecipeCard from "@/app/components/add-recipe/NewRecipeCard";

export async function getRecipes(query: string, category: string) {

  console.log('CATEGORY', category)

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user || "";

    const allRecipes = await prisma.recipe.findMany({
      where: {
        userId: user?.id,
        // category: {contains: query},
        name: {
          contains: query,
          mode: 'insensitive'
        },
      },
      include: {
        ingredients: true,
      },
    });
    await prisma.$disconnect();
    return new Response(JSON.stringify(allRecipes));
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving recipes");
  }
}
