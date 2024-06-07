'use server'

import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

export default async function getFriends () {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

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


  console.log('friend', response)
  await prisma.$disconnect();
  return response;
}