'use server'

import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'


export async function getRecipes(query: string, category: string, page: number) {
  const resultsPerPage = 9;

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;


    if (category === 'Name') {
    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        userId: user?.id,
        name: {
          contains: query,
          mode: 'insensitive'
        },
      },
      include: {
        ingredients: true,
        keywords: true,
      },
    });
    await prisma.$disconnect();
    return new Response(JSON.stringify(allRecipes));
  }

  // QUERY BY INGREDIENT
  if (category === 'Ingredient') {
    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        userId: user?.id,
        ingredients: {
          some: {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          }
        }
      },
      include: { ingredients: true, keywords: true}
    });
    await prisma.$disconnect();
    return new Response(JSON.stringify(allRecipes));
  }

  // query for keywords
  if (category === 'Keyword') {
    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        userId: user?.id,
        keywords: {
          some: {
            name: {
              contains: query,
              mode: 'insensitive'
            },
          }
        }
      },
      include: {
        ingredients: true,
        keywords: true,
      },
    });
    await prisma.$disconnect();
    return new Response(JSON.stringify(allRecipes));
  }

  // query for author
  if (category === 'Author') {
        const allRecipes = await prisma.recipe.findMany({
          skip: (page - 1) * resultsPerPage,
          take: resultsPerPage,
          where: {
            userId: user?.id,
            author: {
              contains: query,
              mode: 'insensitive'
            },
          },
          include: {
            ingredients: true,
            keywords: true,
          },
        });
        await prisma.$disconnect();
        return new Response(JSON.stringify(allRecipes));
  }

  if (category === 'Publisher') {
    // query for publisher
    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        userId: user?.id,
        publisherName: {
          contains: query,
          mode: 'insensitive'
        },
      },
      include: {
        ingredients: true,
        keywords: true,
      },
    });
    await prisma.$disconnect();
    return new Response(JSON.stringify(allRecipes));
  }

  const allRecipes = await prisma.recipe.findMany({
    skip: (page - 1) * resultsPerPage,
    take: resultsPerPage,
    where: {
      userId: user?.id,
      name: {
        contains: query,
        mode: 'insensitive'
      },
    },
    include: {
      ingredients: true,
      keywords: true,
    },
  });
  await prisma.$disconnect();
  return new Response(JSON.stringify(allRecipes));
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving recipes");
  }
}
