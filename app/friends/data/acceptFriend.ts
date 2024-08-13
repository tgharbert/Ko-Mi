'use server'

import prisma from "../../api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

export default async function addFriend (id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  try {
    const updatedFriend = await prisma.friend.updateMany({
      where: {
        friendAId: id,
        friendBId: user.id,
      },
      data: {
        status: "ACCEPTED",
      }
    });
    await prisma.$disconnect();
    return updatedFriend;
  } catch (error) {
    console.error("Error adding friend: ", error)
    throw error;
  }
}