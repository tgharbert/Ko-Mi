'use server';

import prisma from "@/app/api/_base"
import { getServerSession } from "next-auth";
import {authOptions} from "@/utils/authOptions"
import { revalidatePath } from "next/cache";

type IngredientData = {
  id: number;
    ingredientId: number | null;
    checked: boolean;
    name: string | null;
    // location: string | null;
}

export async function getUserIngredients() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;


    // let allIngredients: IngredientData[] = await prisma.userIngredient.findMany({
    //   where: {
    //     userId: user?.id,
    //     checked: false
    //   },
    //   select: {
    //     id: true,
    //     ingredientId: true,
    //     name: true,
    //     checked: true,
    //   },
    // });

    let allIngredients = await prisma.userIngredient.findMany({
      where: {
        userId: user?.id,
        checked: false
      },
      select: {
        id: true,
        ingredientId: true,
        name: true,
        checked: true,
        // location: true,
      },
      include: {
        location: true, // Include the related location data
      },
    });

    console.log(allIngredients);



    // let ingredientIds = []
    // for (let i = 0; i < allIngredients.length; i++) {
    //   if (allIngredients[i].ingredientId) {
    //     ingredientIds.push(allIngredients[i].ingredientId)
    //   }
    // }

    const ingredientIds: number[] = allIngredients.map((ingredient) => {
      if (ingredient.ingredientId) {
        return ingredient.ingredientId
      }
      // this filter won't be needed with location data is written into the db on user entering a new ingredient manually
    }).filter((id): id is number => id !== undefined)


    // console.log(ingredientIds.length)
    const locationsArr = await prisma.location.findMany({
      where: {
        ingredientId: {
          in: ingredientIds
        }
      }
    })

    const locationsObj = locationsArr.reduce((acc: any, location) => {
      if (!acc[location.ingredientId.toString()]) {
        acc[location.ingredientId.toString()] = location.store
      }
      return acc;
    }, {})

    allIngredients.map((ingredient) => {
      // console.log(locationsObj[ingredient.ingredientId?.toString()])
      if (ingredient.ingredientId) {
        ingredient.location = locationsObj[ingredient.ingredientId.toString()]
      } else {
        // ingredient.location = "other"
      }
    })

    console.log(allIngredients)

    prisma.$disconnect();
    return allIngredients;
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}

export async function deleteUserIngredients() {
  try {
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email || "";

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    const deletedIngredients = await prisma.userIngredient.deleteMany({
      where: { userId: user?.id },
    });
    revalidatePath('/shopping-list')
    return deletedIngredients;
  } catch (error) {
    console.error("ERROR DELETING ALL INGREDIENTS: ", error);
  }
}
