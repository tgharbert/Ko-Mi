'use server'

import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'

export async function getRecipes(query: string, category: string, page: number, random: string, all: string) {
  const resultsPerPage = 9;

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (random !== "false" && all === 'true') {
      const allRecipes = await prisma.$queryRaw`SELECT
      r.*,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', i.id,
          'name', i.name
        ) ORDER BY i.id
      ) AS ingredients,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', k.id,
          'name', k.name
        ) ORDER BY k.id
      ) AS keywords
      FROM
          "Recipe" r
      INNER JOIN
          (
              SELECT "recipeId" AS "ingredientRecipeId", *
              FROM "Ingredient"
          ) i ON r.id = i."recipeId"
      INNER JOIN
          (
              SELECT "recipeId" AS "keywordRecipeId", *
              FROM "Keyword"
          ) k ON r.id = k."recipeId"
      GROUP BY
          r.id
      ORDER BY
          RANDOM()
      LIMIT ${resultsPerPage}
      `
    await prisma.$disconnect();
      return new Response(JSON.stringify(allRecipes));
    }

    if (random !== "false") {
      const allRecipes = await prisma.$queryRaw`SELECT
      r.*,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', i.id,
          'name', i.name
        ) ORDER BY i.id
      ) AS ingredients,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', k.id,
          'name', k.name
        ) ORDER BY k.id
      ) AS keywords
      FROM
          "Recipe" r
      INNER JOIN
          (
              SELECT "recipeId" AS "ingredientRecipeId", *
              FROM "Ingredient"
          ) i ON r.id = i."recipeId"
      INNER JOIN
          (
              SELECT "recipeId" AS "keywordRecipeId", *
              FROM "Keyword"
          ) k ON r.id = k."recipeId"
      WHERE
          r."userId" = ${user.id}
      GROUP BY
          r.id
      ORDER BY
          RANDOM()
      LIMIT ${resultsPerPage}
      `
    await prisma.$disconnect();
      return new Response(JSON.stringify(allRecipes));
    }

    if (category === 'name' && query !== '') {

    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        // userId: user?.id,
        userId: all === 'false' ? user.id : undefined,
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

  if (category === 'ingredient') {
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
  if (category === 'keyword') {
    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        userId: all === 'false' ? user.id : undefined,
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
  if (category === 'author') {
        const allRecipes = await prisma.recipe.findMany({
          skip: (page - 1) * resultsPerPage,
          take: resultsPerPage,
          where: {
            userId: all === 'false' ? user.id : undefined,
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

  if (category === 'publisher') {
    // query for publisher
    const allRecipes = await prisma.recipe.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: {
        userId: all === 'false' ? user.id : undefined,
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

  // HOLDING ON TO THIS BECAUSE I DON'T KNOW IF I'LL NEED IT AGAIN

  const allRecipes = await prisma.recipe.findMany({
    skip: (page - 1) * resultsPerPage,
    take: resultsPerPage,
    where: {
      userId: all === 'false' ? user.id : undefined,
      name: {
        contains: query,
        mode: 'insensitive'
      },
    },
    orderBy: {
      id: 'desc'
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
