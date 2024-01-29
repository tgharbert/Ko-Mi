import { Recipe } from "@prisma/client";

const getRecipeObject = (array: any) => {
  if (Array.isArray(array)) {
    if (array[0]["@graph"]) {
      // right now this is just the last? object in the array
      let recipe = array[0]["@graph"][array[0]["@graph"].length - 1];
      console.log(recipe);
      formatRecipe(recipe);
      return recipe;
    }
    return getRecipeObject(array[0]);
  } else {
    let recipe = array;
    formatRecipe(recipe);
    return recipe;
  }
};

// SHOULD WRITE A BUILD RECIPE FUNCTION THAT FORMATS RECIPE...

// all sub formatters go into this 'master' formatter
const formatRecipe = (recipe: any) => {
  getImage(recipe);
  getAuthor(recipe);
  getRecipeYield(recipe);
  getAggregateRating(recipe);
  getPublisherInfo(recipe);
  getUrl(recipe);
  getKeywords(recipe);
};

const getImage = (recipe: any) => {
  if (Array.isArray(recipe.image)) {
    recipe.image = recipe.image[0];
  }
  if (recipe.image.url) {
    recipe.image = recipe.image.url;
  }
  if (typeof recipe.image === "string") {
    recipe.image = recipe.image;
  }
};

const getAuthor = (recipe: any) => {
  if (Array.isArray(recipe.author)) {
    recipe.author = recipe.author[0].name;
  } else {
    recipe.author = "";
  }
};

const getRecipeYield = (recipe: any) => {
  if (Array.isArray(recipe.recipeYield)) {
    recipe.recipeYield = recipe.recipeYield[0];
  }
};

const getAggregateRating = (recipe: any) => {
  if (recipe.aggregateRating) {
    recipe.aggregateRating = parseFloat(recipe.aggregateRating.ratingValue);
  }
};

const getPublisherInfo = (recipe: any) => {
  if (!recipe.publisherName && recipe.publisher) {
    recipe.publisherName = recipe.publisher.name;
  }
  if (recipe.publisher) {
    recipe.publisherUrl = recipe.publisher.url;
    recipe.publisherLogo = recipe.publisher.logo.url;
  }
};

const getUrl = (recipe: any) => {
  if (!recipe.url) {
    recipe.url = recipe.mainEntityOfPage["@id"];
  }
};

const getKeywords = (recipe: any) => {
  if (typeof recipe.keywords === "string") {
    const keyword = recipe.keywords;
    recipe.keywords = [keyword];
  }
};

export default getRecipeObject;
