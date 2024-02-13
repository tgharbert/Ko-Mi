import prisma from "../_base"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user || "";
    const allIngredients = await prisma.userIngredient.findMany({
      where: {
        userId: user?.id,
        checked: false
      },
      select: {
        id: true,
        ingredientId: true,
        name: true,
        checked: true,
      },
    });
    prisma.$disconnect();
    return new Response(JSON.stringify(allIngredients));
  } catch (error) {
    console.error("error", error);
    return new Response("Error retrieving data");
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email || "";

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    const deletedIngredients = await prisma.userIngredient.deleteMany({
      where: { userId: user?.id },
    });
    return new Response(JSON.stringify(deletedIngredients));
  } catch (error) {
    console.error("ERROR DELETING ALL INGREDIENTS: ", error);
  }
}
