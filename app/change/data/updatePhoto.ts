'use server'
import prisma from "@/app/api/_base"
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function updatePhoto(recipeId: number, address: string, newName: string) {
  try {
    let target = Number(recipeId)
    // delete recipe photo from supabase, then insert new address...
    let oldRecipeVals = await prisma.recipe.findUnique({
      where: {
        id: target,
      }
    })
    if (oldRecipeVals == null) {
      return;
    }
    const getFilePath = (url: string) => {
      // gets everything after /images/ in the photo url
      let urlArr = url.split('/')
      const path = urlArr[urlArr.length - 1]
      return path;
    }

    let filePath = getFilePath(oldRecipeVals.image)

    const { error } = await supabase.storage
      .from("images")
      .remove([filePath])
    if (error) {
      console.error("WHOOPSIES, error deleting old photo from db: ", error)
    }
    let recipe = await prisma.recipe.update({
      where: {
        id: target
      },
      data: {
        name: newName,
        image: address,
      }
    })
    await prisma.$disconnect();
    revalidatePath(`/change/${recipeId}`)
    return;
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}