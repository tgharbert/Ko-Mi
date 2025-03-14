const getRecipeObject = (recipeData: any): RawRecipe | undefined => {
  // console.log('initial data: ', recipeData)
  if (Array.isArray(recipeData)) {
    for (let key in recipeData) {
      if (recipeData[key]["@type"] === "Recipe") {
        const recipe = recipeData[key]
        formatRecipe(recipe);
        return recipe;
      } else if (recipeData[key]["@graph"]) {
        // getRecipeObject(recipeData[key]["@graph"])
        let graphArray = recipeData[key]["@graph"];
        for (let key in graphArray) {
          if (graphArray[key]["@type"] === "Recipe") {
            let recipe = graphArray[key];
            formatRecipe(recipe);
            return recipe;
          }
        }
      }
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
  // if it's an object with a url key
  if (recipe.image.url) {
    recipe.image = recipe.image.url;
  }
  // if it's just a url string
  if (typeof recipe.image === "string") {
    recipe.image = recipe.image;
  }
};

const getAuthor = (recipe: any) => {
  if (recipe.author === undefined) {
    recipe.author = "Not Provided";
  }
  // if it's an object inside of an array of length 1
  if (Array.isArray(recipe.author)) {
    recipe.author = recipe.author[0].name;
  } else if (recipe.author.name) {
    // if it's an object
    recipe.author = recipe.author.name;
  } else {
    // if it wasn't provided
    recipe.author = "Not Provided";
  }
};

const getRecipeYield = (recipe: any) => {
  if (!recipe.recipeYield) {
    recipe.recipeYield = '1'
  } else if (Array.isArray(recipe.recipeYield)) {
    recipe.recipeYield = parseYieldNumber(recipe.recipeYield[0]);
  } else {
    recipe.recipeYield = String(recipe.recipeYield)
    recipe.recipeYield = parseYieldNumber(recipe.recipeYield)
  }
};

// get just the number from recipe yield
const parseYieldNumber = (string: string) => {
  let servingArray = string.split(' ');
  let number;
  servingArray.forEach((word) => {
    // check for all types of dashes - things like '–' and '—' are not the same as '-'
    // ex: "4–6 servings"
    if (word.includes('-') || word.includes('–') || word.includes('—')) {
      // replace the dash with a single dash
      const normalizedWord = word.replace(/[-–—]/g, '-');
      let splitWord = normalizedWord.split('-');
      word = splitWord[0];
    }
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

// this could be refactored - a little messy at the moment
const getInstructions = (recipe: any) => {
  let instructions: string[] = [];
  if (!recipe.recipeInstructions) {
    instructions.push("Please visit recipe link")
  } else if (recipe.recipeInstructions.length === 1) {
    // if the array of instructions are an array of objects inside of an array length 1
    let recipeContainer = recipe.recipeInstructions[0];
    if (recipeContainer.itemListElement) {
      recipeContainer = recipeContainer.itemListElement;
    }
    // handles a steps object with a text property with numberical values marking
    // each new 'step'
    if (recipeContainer["@type"] === "HowToStep") {
      const recipe = recipeContainer.text;
      const steps = recipe.split(/\b\d+\.\s/).filter((step: string) => step.trim() !== '');
      // console.log('container: ', steps)
      recipeContainer = steps;
    }
    recipeContainer.map((item: any) => {
      // covers if there is just string, created in the case of large text block
      if (!item.text) {
        instructions.push(item)
      } else {
        instructions.push(item.text)
      }
    })
  } else {
  recipe.recipeInstructions.map((item: any) => {
    // if it's an array of objects with text, etc
    if (item["@type"] === "HowToSection") {
      instructions.push(item.name + ":");
      item.itemListElement.map((instruction: any) => {
        instructions.push(instruction.text);
      });
    } else if (typeof item === 'string') {
      instructions.push(item);
    } else if (item.text) {
      // if the instructions are just an array of text
      instructions.push(item.text);
    }
  });
}
  recipe.instructions = instructions;
};


export default getRecipeObject;
