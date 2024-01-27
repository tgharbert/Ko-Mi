import { Recipe } from "@prisma/client";

const getRecipeObject = (array: any) => {
  if (Array.isArray(array)) {
    if (array[0]["@graph"]) {
      // right now this is just the last? object in the array
      // console.log(array[0]["@graph"][array[0]["@graph"].length - 1]);
      // return array[0]["@graph"][array[0]["@graph"].length - 1];
      let recipe = array[0]["@graph"][array[0]["@graph"].length - 1];
      getImage(recipe);
      getAuthor(recipe);
      console.log("HERE", recipe);
      return recipe;
    }
    return getRecipeObject(array[0]);
  } else {
    let recipe = array;
    getImage(recipe);
    getAuthor(recipe);
    // console.log(array);
    return recipe;
  }
};

// SHOULD WRITE A BUILD RECIPE FUNCTION THAT FORMATS RECIPE...

// image
const getImage = (recipe: any) => {
  if (Array.isArray(recipe.image)) {
    recipe.image = recipe.image[0];
  }
  if (recipe.image.url) {
    recipe.image = recipe.image.url;
  }
};

const getAuthor = (recipe: any) => {
  recipe.author = recipe.author[0].name;
};

export default getRecipeObject;
