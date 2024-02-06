// NEED TO WRITE A FUNCTION THAT ADDS THE INGREDIENTS TO THE SHOPPING LIST DATABASE

// need to get the user from the session info and add the ingredients to the ingredients array
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function POST(req: Request, res: Response) {
  const data = await req.json();
}
