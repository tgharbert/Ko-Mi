import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const recipe = await req.json();
  const newRecipe = prisma.recipe.create({
    data: {
      title: recipe.title || "Untitled",
      author: recipe.author[0].name,
      description: recipe.description,
      name: recipe.name,
      keywords: recipe.keywords,
    },
  });
  newRecipe
    .then((newRecipe) => {
      console.log("NEW RECIPE: ", newRecipe);
    })
    .catch((error) => {
      console.error("ERROR: ", error);
    });
  return new Response(JSON.stringify(newRecipe));
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
