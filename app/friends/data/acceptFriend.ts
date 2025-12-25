'use server'

import prisma from "../../api/_base"
import { auth } from "@/auth";

export default async function addFriend (id: string) {
  const session = await auth();
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