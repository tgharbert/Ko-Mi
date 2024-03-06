export default function buildCustomRecipe (name: string, description: string, servingSize: string, cookTime: string, ingredients: string[], instructions: string[], keywords: string[], file: File | null) {

  let recipe = {
    name,
    description,
    servingSize,
    cookTime,
    ingredients,
    instructions,
    keywords,
    photoFile: file
  }
  return recipe
}