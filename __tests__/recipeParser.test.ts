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

// // the Wanderlust Kithen
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

// // desert for two
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