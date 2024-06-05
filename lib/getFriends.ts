'use server'

import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

export default async function getFriends () {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  const allUsers = await prisma.friend.findMany();
  await prisma.$disconnect();
  return new Response(JSON.stringify(allUsers));
}