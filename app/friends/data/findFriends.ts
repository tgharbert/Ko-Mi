'use server'
import prisma from "../../api/_base"

export default async function findFriends (inputName: string) {
  try {
    const foundUsers = await prisma.user.findMany({
      where: {
        name: {
          contains: inputName,
          mode: 'insensitive'
        },
      }
    })
    await prisma.$disconnect();
    return foundUsers;
  } catch (error) {
    console.error(`Error finding friend ${inputName}. Error: `, error)
    return;
  }
}