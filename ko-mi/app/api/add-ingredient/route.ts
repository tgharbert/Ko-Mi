// NEED TO WRITE A FUNCTION THAT ADDS THE INGREDIENTS TO THE SHOPPING LIST DATABASE

// need to get the user from the session info and add the ingredients to the ingredients array
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

type Entry = {
  userId: string;
  ingredientId: number;
  name: string;
};

export async function POST(req: Request, res: Response) {
  try {
    const recipeData = await req.json();
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email || "";

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    let newEntry = [];

    await recipeData.map((ingredient: any) => {
      let entry: Entry = {
        userId: user?.id || "",
        ingredientId: ingredient.id,
        // need to work on adding the multiplier
        name: ingredient.name
      };
      newEntry.push(entry);
    });

    const newIngredients = await prisma.userIngredient.createMany({
      data: newEntry,
    });

    return new Response(JSON.stringify(newIngredients));
  } catch (error) {
    console.error(error);
    return new Response("ERROR: ", error);
  }
}
