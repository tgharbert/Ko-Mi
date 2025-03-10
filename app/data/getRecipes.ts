'use server'

import prisma from "../api/_base"

export async function getRecipes(query: string, category: string, page: number, random: string, all: string, id: string) {
  const resultsPerPage = 12;
  try {
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
          r."userId" = ${id}
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
        userId: all === 'false' ? id : undefined,
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
        userId: id,
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
        userId: all === 'false' ? id : undefined,
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
            userId: all === 'false' ? id : undefined,
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
        userId: all === 'false' ? id : undefined,
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
      userId: all === 'false' ? id : undefined,
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
