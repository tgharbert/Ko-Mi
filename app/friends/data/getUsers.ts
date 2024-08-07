'use server'
import prisma from "../../api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'
import { FriendStatus } from "@prisma/client";

export default async function getUsers () {

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  const allUsers = await prisma.friend.findMany({
    where: {
      OR: [
        { friendAId: user.id },
        { friendBId: user.id }
      ],
      status: "PENDING"
    },
    include: {
      friendA: true,
      friendB: true
    }
  });

  let response: User[] = [];

  allUsers.map((friend: any) => {
    if (friend.friendA.id === user.id) {
      friend.friendB.direction = "sent";
      response.push(friend.friendB)
    } else {
      friend.friendA.direction = "recieved"
      response.push(friend.friendA)
    }
  })

  // console.log('response: ', response)
  await prisma.$disconnect();
  return new Response(JSON.stringify(response));
}
