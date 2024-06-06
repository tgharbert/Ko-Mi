'use server'

import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

export default async function addFriend (id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  try {
    const newFriend = await prisma.friend.create({
      data: {
        friendAId: user.id,
        friendBId: id,
        status: "PENDING"
      }
    });
    await prisma.$disconnect();
    console.log(newFriend.status)
    return newFriend.status;
  } catch (error) {
    console.error("Error adding friend: ", error)
    throw error;
  }
}