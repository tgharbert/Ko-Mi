import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// try to get the user info here...

export async function GET() {
  // do this where the userId matches in the recipe's user
  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email || "";

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  const allRecipes = await prisma.recipe.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      ingredients: true,
    },
  });

  return new Response(JSON.stringify(allRecipes));
}
