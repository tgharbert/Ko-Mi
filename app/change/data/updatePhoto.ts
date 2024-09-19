'use server'
import prisma from "@/app/api/_base"
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function updatePhoto(recipeId: number, address: string, newName: string) {
  try {
    console.log("HIT")

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

    console.log("newName: ", newName)
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
    // return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.error("ERROR: ", error);
    return new Response();
  }
}