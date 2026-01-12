import gochujangChicken from '@/testData/scraper/gochujangChicken.json'
import mustardPorkTenderloin from '@/testData/scraper/mustardPorkTenderloin.json'
import tuscanWhiteBean from '@/testData/scraper/tuscanWhiteBean.json'
import alisonRomanOnePotChicken from '@/testData/scraper/alisonRomanOnePotChicken.json'
import getData from "@/utils/scraper";


test('gets Gochujang Chicken recipe', async () => {
  const gochujangChickenURL = "https://www.bonappetit.com/recipe/slow-roast-gochujang-chicken"
  const actual: any = await getData(gochujangChickenURL);
  const expected: any = gochujangChicken;

  // Only test stable fields, ignore dynamic values like rating counts
  expect(actual[0].name).toEqual(expected[0].name);
  expect(actual[0].recipeIngredient).toEqual(expected[0].recipeIngredient);
  expect(actual[0].recipeInstructions).toEqual(expected[0].recipeInstructions);
  expect(actual[0].description).toEqual(expected[0].description);
  expect(actual[0].recipeYield).toEqual(expected[0].recipeYield);
  expect(actual[0].totalTime).toEqual(expected[0].totalTime);
  expect(actual[0].author).toEqual(expected[0].author);
});


test('gets Mustard-Glazed Pork Tenderloin recipe', async () => {
  const URL = "https://cooking.nytimes.com/recipes/10080-mustard-glazed-pork-tenderloin"
  const actual: any = await getData(URL);
  const expected: any = mustardPorkTenderloin;

  expect(actual.name).toEqual(expected.name);
  expect(actual.url).toEqual(expected.url);
  expect(actual.recipeIngredient).toEqual(expected.recipeIngredient);
  expect(actual.recipeInstructions).toEqual(expected.recipeInstructions);
  expect(actual.totalTime).toEqual(expected.totalTime);
  expect(actual.recipeYield).toEqual(expected.recipeYield);
})

test('gets Tuscan White Bean recipe', async () => {
  const URL = "https://thewanderlustkitchen.com/tuscan-white-bean-skillet/"
  const actual: any = await getData(URL);
  const expected: any = tuscanWhiteBean;

  expect(actual.name).toEqual(expected.name);
  expect(actual.url).toEqual(expected.url);
  expect(actual.recipeIngredient).toEqual(expected.recipeIngredient);
  expect(actual.recipeInstructions).toEqual(expected.recipeInstructions);
})

test('gets Alison Roman One-Pot Chicken recipe', async () => {
  const URL = "https://www.alisoneroman.com/recipes/one-pot-chicken/"
  const actual: any = await getData(URL);
  const expected: any = alisonRomanOnePotChicken;

  // Find the Recipe schema object (not Article)
  const actualRecipe = actual.find((item: any) => item['@type'] === 'Recipe');
  const expectedRecipe = expected.find((item: any) => item['@type'] === 'Recipe');

  expect(actualRecipe.name).toEqual(expectedRecipe.name);
  expect(actualRecipe.recipeIngredient).toEqual(expectedRecipe.recipeIngredient);
  expect(actualRecipe.recipeInstructions).toEqual(expectedRecipe.recipeInstructions);
  expect(actualRecipe.recipeYield).toEqual(expectedRecipe.recipeYield);
})