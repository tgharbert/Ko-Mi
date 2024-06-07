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

    let response: Friend[] = [];

    allUsers.map((friend: any) => {
      if (friend.friendA.id === user.id) {
        friend.friendB.direction = "sent";
        response.push(friend.friendB)
      } else {
        friend.friendA.direction = "recieved"
        response.push(friend.friendA)
      }
    })

    console.log(response)

    await prisma.$disconnect();
    return response;
    // console.log(newFriend.status)
    // return newFriend.status;
  } catch (error) {
    console.error("Error adding friend: ", error)
    throw error;
  }
}