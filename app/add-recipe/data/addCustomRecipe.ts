'use server'
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'
import prisma from "@/app/api/_base"
import assignValues from "@/utils/assignRecipeIngLoc";

export async function addCustomRecipe(recipe: any) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User

    recipe.keywords = recipe.keywords || ["No available keywords"]
    recipe.instructions = recipe.instructions || ['No available instructions']

    const addSection = async (locationData: LocData[]) => {
      try {
        await prisma.location.createMany({
          data: locationData,
        });
      } catch (err) {
        console.error(`Error adding locations: ${locationData}`, err)
        return err;
      }
    };

    const newRecipe = await prisma.recipe.create({
        data: {
          url: recipe.url || recipe.name,
          author: user?.name || 'no provided username',
          description: recipe.description,
          name: recipe.name,
          keywords: {
          create: recipe.keywords.map((keyword: string) => ({
            name: keyword
          }))
        },
        ingredients: {
          create: recipe.ingredients.map((ingredient: string) => ({
            name: ingredient,
          })),
        },
        instructions: recipe.instructions,
        users: { connect: { id: user?.id } },
        image: recipe.photoFile,
        recipeYield: Number(recipe.servingSize),
        totalTime: recipe.totalTime || "Value not assigned",
        cookTime: recipe.cookTime || "Value not assigned",
        category: recipe.recipeCategory || ["Value not assigned"],
        prepTime: recipe.prepTime || "Value not assigned",
      },
    });

    let ingredients = await prisma.ingredient.findMany({
      where: {
        recipeId: newRecipe.id
      }
    })

    const locationData: LocData[] = assignValues(ingredients)
    await addSection(locationData)

    await prisma.$disconnect();
    return;
  } catch (error) {
    console.error("ERROR ADDING CUSTOM RECIPE: ", error);
    // return new Response();
    return;
  }
}
