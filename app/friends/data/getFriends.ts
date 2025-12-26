'use server'

import prisma from "../../api/_base"
import { auth } from "@/auth";

export default async function getFriends () {
  const session = await auth();
  const user = session?.user as User;

  try {
    const allFriends = await prisma.friend.findMany({
      where: {
        OR: [
          { friendAId: user.id },
          { friendBId: user.id }
        ],
        status: "ACCEPTED"
      },
      include: {
        friendA: true,
        friendB: true
      }
    });

    let response: User[] = [];

    allFriends.map((friend: any) => {
      if (friend.friendA.id === user.id) {
        response.push(friend.friendB)
      } else {
        response.push(friend.friendA)
      }
    })


    await prisma.$disconnect();
    return response;
  } catch (error) {
    console.error('Error retrieving friends: ', error)
  }
}