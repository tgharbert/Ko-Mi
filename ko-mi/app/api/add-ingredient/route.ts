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

    let newEntry: Entry[] = [];

    recipeData.map((ingredient: any) => {
      let entry: Entry = {
        userId: user?.id || "",
        ingredientId: ingredient.id,
        // need to work on adding the multiplier
        // should get the multiplier from the client and then apply here?
        // parseNumberAmount
        name: ingredient.name,
      };
      newEntry.push(entry);
    });

    const newIngredients = await prisma.userIngredient.createMany({
      data: newEntry,
    });
    console.log(newIngredients);
    return new Response(JSON.stringify(newIngredients));
  } catch (error) {
    console.error(error);
    return new Response("ERROR: ", error);
  }
}
