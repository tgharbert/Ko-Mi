import prisma from "../_base"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user || "";

    const allRecipes = await prisma.recipe.findMany({
      where: {
        userId: user?.id,
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
