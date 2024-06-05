'use server'

import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

export default async function getUsers () {


  const allUsers = await prisma.user.findMany();
  await prisma.$disconnect();
  return new Response(JSON.stringify(allUsers));
}