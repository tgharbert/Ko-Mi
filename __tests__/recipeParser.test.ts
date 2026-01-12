import getRecipeObject from "@/utils/parseRecipe";
import gochujangChickenResultData from "@/testData/getRecipeObject/gochujangChickenResultData.json";
import gochujangChicken from '@/testData/scraper/gochujangChicken.json'
import mustardPorkTenderloinResultData from "@/testData/getRecipeObject/mustardPorkTenderloin.json"
import mustardPorkTenderloin from '@/testData/scraper/mustardPorkTenderloin.json'
import tuscanWhiteBeanData from '@/testData/getRecipeObject/tuscanWhiteBean.json'
import tuscanWhiteBean from '@/testData/scraper/tuscanWhiteBean.json'
import chickenCacciatoreData from '@/testData/getRecipeObject/chickenCacciatore.json'
import chickenCacciatore from '@/testData/scraper/chickenCacciatore.json'
import cauliflowerSaladData from '@/testData/getRecipeObject/cauliflowerSalad.json'
import cauliflowerSalad from '@/testData/scraper/cauliflowerSalad.json'
import easyNoKneadFocaccia from '@/testData/scraper/easyNoKneadFocaccia.json'
import easyNoKneadFocacciaData from '@/testData/getRecipeObject/easyNoKneadFocaccia.json'

// Bon Appetit
test('gets Gochujang Chicken recipe object', () => {
  const expected = gochujangChickenResultData;
  const actual: RawRecipe | undefined = getRecipeObject(gochujangChicken);
  expect(actual?.author).toEqual(expected.author);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.name).toEqual(expected.name);
  expect(actual?.author).toEqual(expected.author);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.description).toEqual(expected.description);
  expect(actual?.recipeIngredient).toEqual(expected.recipeIngredient);

});

// // NYT Cooking
test('gets Mustard-Glazed Pork Tenderloin recipe object', () => {
  const expected = mustardPorkTenderloinResultData;
  const actual = getRecipeObject(mustardPorkTenderloin)
  expect(actual?.author).toEqual(expected.author);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.name).toEqual(expected.name);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.description).toEqual(expected.description);
  expect(actual?.recipeIngredient).toEqual(expected.recipeIngredient);

})

// the Wanderlust Kithen
test('gets Tuscan White Bean Dish recipe object', () => {
  const expected = tuscanWhiteBeanData;
  const actual = getRecipeObject(tuscanWhiteBean);
  expect(actual?.author).toEqual("Not Provided");
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.name).toEqual(expected.name);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.description).toEqual(expected.description);
  expect(actual?.recipeIngredient).toEqual(expected.recipeIngredient);
})

// desert for two
test('gets Chicken Cacciatore recipe object', () => {
  const expected = chickenCacciatoreData;
  const actual = getRecipeObject(chickenCacciatore)
  expect(actual?.author).toEqual(expected.author);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.name).toEqual(expected.name);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.description).toEqual(expected.description);
  expect(actual?.recipeIngredient).toEqual(expected.recipeIngredient);
})

test('gets Cauliflower Salad recipe object', () => {
  const expected = cauliflowerSaladData;
  const actual = getRecipeObject(cauliflowerSalad);
  expect(actual?.author).toEqual("Not Provided");
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.name).toEqual(expected.name);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.description).toEqual(expected.description);
  expect(actual?.recipeIngredient).toEqual(expected.recipeIngredient);
})

test('gets `Easy No-Knead Focaccia Bread` recipe object', () => {
  const expected = easyNoKneadFocacciaData;
  const actual = getRecipeObject(easyNoKneadFocaccia);
  expect(actual?.author).toEqual(expected.author);
  expect(actual?.instructions).toEqual(expected.instructions);
  expect(actual?.name).toEqual(expected.name);
})

test('handles array with @graph structure', () => {
  const graphData = [{
    "@graph": [{
      "@type": "Recipe",
      "name": "Test Recipe",
      "recipeIngredient": ["1 cup flour"],
      "recipeInstructions": [{"@type": "HowToStep", "text": "Mix ingredients"}],
      "author": {"name": "Test Author"},
      "image": "https://example.com/image.jpg"
    }]
  }];
  const actual = getRecipeObject(graphData);
  expect(actual?.name).toEqual("Test Recipe");
  expect(actual?.author).toEqual("Test Author");
})

test('handles non-array recipe data', () => {
  const singleRecipe = {
    "@type": "Recipe",
    "name": "Single Recipe",
    "recipeIngredient": ["2 eggs"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Cook the eggs"}],
    "author": {"name": "Chef"},
    "image": {"url": "https://example.com/image.jpg"},
    "recipeYield": "2 servings",
    "keywords": "breakfast",
    "recipeCategory": "breakfast"
  };
  const actual = getRecipeObject(singleRecipe);
  expect(actual?.name).toEqual("Single Recipe");
  expect(actual?.author).toEqual("Chef");
  expect(actual?.keywords).toEqual(["breakfast"]);
  expect(actual?.recipeCategory).toEqual(["breakfast"]);
  expect(actual?.instructions).toEqual(["Cook the eggs"]);
})

test('handles recipe with array image', () => {
  const recipeWithArrayImage = {
    "@type": "Recipe",
    "name": "Array Image Recipe",
    "recipeIngredient": ["1 cup milk"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Heat milk"}],
    "image": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
  };
  const actual = getRecipeObject(recipeWithArrayImage);
  expect(actual?.image).toEqual("https://example.com/image1.jpg");
  expect(actual?.instructions).toEqual(["Heat milk"]);
})

test('handles recipe with array author', () => {
  const recipeWithArrayAuthor = {
    "@type": "Recipe",
    "name": "Array Author Recipe",
    "recipeIngredient": ["1 cup water"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Boil water"}],
    "author": [{"name": "First Author"}, {"name": "Second Author"}],
    "image": "https://example.com/image.jpg"
  };
  const actual = getRecipeObject(recipeWithArrayAuthor);
  expect(actual?.author).toEqual("First Author");
  expect(actual?.instructions).toEqual(["Boil water"]);
})

test('handles recipe with array recipeYield', () => {
  const recipeWithArrayYield = {
    "@type": "Recipe",
    "name": "Array Yield Recipe",
    "recipeIngredient": ["1 cup sugar"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Mix sugar"}],
    "recipeYield": ["4–6 servings", "Serves 4-6"],
    "image": "https://example.com/image.jpg"
  };
  const actual = getRecipeObject(recipeWithArrayYield);
  expect(actual?.recipeYield).toEqual(4);
  expect(actual?.instructions).toEqual(["Mix sugar"]);
})

test('handles recipe with missing recipeYield', () => {
  const recipeNoYield = {
    "@type": "Recipe",
    "name": "No Yield Recipe",
    "recipeIngredient": ["1 cup oil"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Heat oil"}],
    "image": "https://example.com/image.jpg"
  };
  const actual = getRecipeObject(recipeNoYield);
  expect(actual?.recipeYield).toEqual('1');
  expect(actual?.instructions).toEqual(["Heat oil"]);
})

test('handles recipe with HowToSection instructions', () => {
  const recipeWithSections = {
    "@type": "Recipe",
    "name": "Sectioned Recipe",
    "recipeIngredient": ["1 cup flour"],
    "image": "https://example.com/image.jpg",
    "recipeInstructions": [
      {
        "@type": "HowToSection",
        "name": "Preparation",
        "itemListElement": [
          {"@type": "HowToStep", "text": "Preheat oven"},
          {"@type": "HowToStep", "text": "Mix ingredients"}
        ]
      },
      {
        "@type": "HowToSection",
        "name": "Cooking",
        "itemListElement": [
          {"@type": "HowToStep", "text": "Bake for 30 minutes"}
        ]
      }
    ]
  };
  const actual = getRecipeObject(recipeWithSections);
  expect(actual?.instructions).toContain("Preparation:");
  expect(actual?.instructions).toContain("Preheat oven");
  expect(actual?.instructions).toContain("Cooking:");
  expect(actual?.instructions).toContain("Bake for 30 minutes");
})

test('handles recipe with itemListElement in single instruction array', () => {
  const recipeWithItemList = {
    "@type": "Recipe",
    "name": "ItemList Recipe",
    "recipeIngredient": ["1 egg"],
    "image": "https://example.com/image.jpg",
    "recipeInstructions": [{
      "itemListElement": [
        {"@type": "HowToStep", "text": "Crack egg"},
        {"@type": "HowToStep", "text": "Beat egg"}
      ]
    }]
  };
  const actual = getRecipeObject(recipeWithItemList);
  expect(actual?.instructions).toContain("Crack egg");
  expect(actual?.instructions).toContain("Beat egg");
})

test('handles recipe with missing instructions', () => {
  const recipeNoInstructions = {
    "@type": "Recipe",
    "name": "No Instructions Recipe",
    "recipeIngredient": ["1 cup water"],
    "image": "https://example.com/image.jpg"
  };
  const actual = getRecipeObject(recipeNoInstructions);
  expect(actual?.instructions).toContain("Please visit recipe link");
})

test('handles recipe with aggregateRating', () => {
  const recipeWithRating = {
    "@type": "Recipe",
    "name": "Rated Recipe",
    "recipeIngredient": ["1 cup milk"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Heat milk"}],
    "image": "https://example.com/image.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": 100
    }
  };
  const actual = getRecipeObject(recipeWithRating);
  expect(actual?.aggregateRating).toEqual(4.5);
  expect(actual?.instructions).toEqual(["Heat milk"]);
})

test('handles recipe with publisher info', () => {
  const recipeWithPublisher = {
    "@type": "Recipe",
    "name": "Published Recipe",
    "recipeIngredient": ["1 cup sugar"],
    "recipeInstructions": [{"@type": "HowToStep", "text": "Dissolve sugar"}],
    "image": "https://example.com/image.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "Test Publisher",
      "url": "https://publisher.com",
      "logo": {
        "url": "https://publisher.com/logo.png"
      }
    }
  };
  const actual = getRecipeObject(recipeWithPublisher);
  expect(actual?.publisherName).toEqual("Test Publisher");
  expect(actual?.publisherUrl).toEqual("https://publisher.com");
  expect(actual?.instructions).toEqual(["Dissolve sugar"]);
})

test('handles recipe with HowToStep text containing numbered steps', () => {
  const recipeWithNumberedText = {
    "@type": "Recipe",
    "name": "Numbered Steps Recipe",
    "recipeIngredient": ["1 cup flour"],
    "image": "https://example.com/image.jpg",
    "recipeInstructions": [{
      "@type": "HowToStep",
      "text": "1. Preheat oven 2. Mix ingredients 3. Bake"
    }]
  };
  const actual = getRecipeObject(recipeWithNumberedText);
  expect(actual?.instructions?.length).toBeGreaterThan(0);
})