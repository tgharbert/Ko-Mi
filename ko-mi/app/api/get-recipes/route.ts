import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  console.log('&&&&&&&&&&&&&&&&&&&&&')

  try {
    // const session = await getServerSession(authOptions);

    // const userEmail = session?.user?.email || "";

    // const user = await prisma.user.findUnique({
    //   where: { email: userEmail },
    // });
    const allRecipes = await prisma.recipe.findMany({
      // where: {
      //   userId: user?.id,
      // },
      include: {
        ingredients: true,
      },
    });
    // console.log(JSON.stringify(allRecipes))
    return new Response(JSON.stringify(allRecipes));
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving recipes");
  }
}
