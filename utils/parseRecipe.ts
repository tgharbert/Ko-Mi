const getRecipeObject = (recipeData: any): object => {
  console.log('________________________', recipeData)
  if (Array.isArray(recipeData)) {
    if (recipeData[0]["@graph"]) {
      let recipe = recipeData[0]["@graph"][recipeData[0]["@graph"].length - 1];
      formatRecipe(recipe);
      return recipe;
    }
    return getRecipeObject(recipeData[0]);
  } else {
    let recipe = recipeData;
    formatRecipe(recipe);
    return recipe;
  }
};

// all sub formatters go into this 'master' formatter
const formatRecipe = (recipe: object) => {
  getImage(recipe);
  getAuthor(recipe);
  getRecipeYield(recipe);
  getAggregateRating(recipe);
  getPublisherInfo(recipe);
  getKeywords(recipe);
  getCategory(recipe);
  getInstructions(recipe);
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
  } else if (recipe.author.name) {
    recipe.author = recipe.author.name;
  } else {
    recipe.author = "";
  }
};

const getRecipeYield = (recipe: any) => {
  if (Array.isArray(recipe.recipeYield)) {
    recipe.recipeYield = parseYieldNumber(recipe.recipeYield[0]);
  } else {
    recipe.recipeYield = parseYieldNumber(recipe.recipeYield)
  }
};
// calling this to get just the number from recipe yield
const parseYieldNumber = (string: string) => {
  const servingArray = string.split(' ');
  let number;
  servingArray.forEach((word) => {
    if (parseInt(word) < 0 || parseInt(word) > 0) {
      number = eval(word)
    }
  })
  return number;
}

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
    if (recipe.publisherLogo) {
      recipe.publisherLogo = recipe.publisher.logo.url;
    }
  }
};

const getKeywords = (recipe: any) => {
  if (typeof recipe.keywords === "string") {
    const keyword = recipe.keywords;
    recipe.keywords = [keyword];
  }
};

const getCategory = (recipe: any) => {
  if (typeof recipe.recipeCategory === "string") {
    const category = recipe.recipeCategory;
    recipe.recipeCategory = [category];
  }
};

// ALL VALUES ARE BEING ADDED TO THE LIST AT THE MOMENT. NEED TO ADD TITLE TO THE FIRST ELEMENT??
// there are edge cases that are not working here... NYT cassoulet for ex
const getInstructions = (recipe: any) => {
  let instructions: string[] = [];
  if (recipe.recipeInstructions.length === 1) {
    console.log('hit conditional')
    let recipeContainer = recipe.recipeInstructions[0];

  }
  recipe.recipeInstructions.map((item: any) => {
    if (item["@type"] === "HowToSection") {
      instructions.push(item.name + ":");
      item.itemListElement.map((instruction: any) => {
        instructions.push(instruction.text);
      });
      recipe.instructions = instructions;
    } else {
      instructions.push(item.text);
      recipe.instructions = instructions;
    }
  });
};

export default getRecipeObject;
