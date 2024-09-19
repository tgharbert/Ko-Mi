'use server'
import prisma from "@/app/api/_base"
import { supabase } from "@/lib/supabase";

export default async function updatePhoto(recipeId: number, address: string) {
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
    // this isn't deleting from the bucket...
    const { error } = await supabase.storage
      .from("images")
      .remove([oldRecipeVals.image])
    if (error) {
      console.error("WHOOPSIES, error deleting old photo from db: ", error)
    }

    let recipe = await prisma.recipe.update({
      where: {
        id: target
      },
      data: {
        image: address
      }
    })
    await prisma.$disconnect();
    return;
    // return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}