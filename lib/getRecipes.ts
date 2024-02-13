import prisma from "../app/api/_base"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getRecipes(query: string, category: string) {

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user || "";

    if (category === 'Name') {
    const allRecipes = await prisma.recipe.findMany({
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
    // console.log(allRecipes)
    return new Response(JSON.stringify(allRecipes));
  }

  // QUERY BY INGREDIENT
  if (category === 'Ingredient') {
    const allRecipes = await prisma.recipe.findMany({
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

  if (category === 'Keyword') {
    // query for keywords
    const allRecipes = await prisma.recipe.findMany({
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

  if (category === 'Author') {
    // query for author
        const allRecipes = await prisma.recipe.findMany({
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
  console.log(allRecipes)
  return new Response(JSON.stringify(allRecipes));
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving recipes");
  }
}
