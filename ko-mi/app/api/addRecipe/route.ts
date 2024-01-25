import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/utils/prisma";
import { PrismaClient } from "@prisma/client";
// export { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    console.log("HIST");
    try {
      console.log(request.body);
    } catch (error) {
      console.error("ERROR POSTING RECIPE: ", error);
    }
  }
}

// export default async function addRecipe(recipe: any) {
//   try {
//     const newRecipe = await prisma.recipe.create({
//       // FIX THIS DATA
//       data: {
//         // fix this data...
//         title: recipe.title || "Untitled",
//         author: recipe.author || "Anonymous",
//         description: recipe.description || "No description",
//         name: recipe.name || "No name",
//         keywords: recipe.keywords || "No keywords",
//         instructions: recipe.instructions || "No instructions",
//         ingredients: recipe.recipeIngredient || "No ingredients",
//         image: recipe.image || "No image",
//         aggregateRating: recipe.aggregateRating || "No rating",
//         cuisine: recipe.cuisine || "No cuisine listed",
//         publisher: recipe.publisher || "No publisher listed",
//         recipeYield: recipe.recipeYield || "No recipe yield listed",
//         mainEntityOfPage: recipe.mainEntityOfPage || "",
//         totalTime: recipe.totalTime || "No total time listed",
//         cookTime: recipe.cookTime || "No cook time listed",
//         prepTime: recipe.prepTime || "No prep time listed",
//       },
//     });
//     console.log("Recipe created:", newRecipe);
//   } catch (error) {
//     console.error("issue writing to db:", error);
//   }
// }
