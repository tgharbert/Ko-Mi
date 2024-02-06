// NEED TO WRITE A FUNCTION THAT ADDS THE INGREDIENTS TO THE SHOPPING LIST DATABASE

// need to get the user from the session info and add the ingredients to the ingredients array
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
