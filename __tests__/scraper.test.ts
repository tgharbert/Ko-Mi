import gochujangChicken from '@/testData/scraper/gochujangChicken.json'
import mustardPorkTenderloin from '@/testData/scraper/mustardPorkTenderloin.json'
import tuscanWhiteBean from '@/testData/scraper/tuscanWhiteBean.json'
import getData from "@/utils/scraper";


test('gets Gochujang Chicken recipe', async () => {
  const gochujangChickenURL = "https://www.bonappetit.com/recipe/slow-roast-gochujang-chicken"
  const actual = await getData(gochujangChickenURL);
  const expected = gochujangChicken;
  expect(actual).toEqual(expected);
});


test('gets Mustard-Glazed Pork Tenderloin recipe', async () => {
  const URL = "https://cooking.nytimes.com/recipes/10080-mustard-glazed-pork-tenderloin"
  const actual: any = await getData(URL);
  const expected: any = mustardPorkTenderloin;
  expect(actual.name).toEqual(expected.name)
  expect(actual.url).toEqual(expected.url)
  expect(actual.recipeIngredient).toEqual(expected.recipeIngredient);
})

// not sure why this is failing -- doesn't affect coverage
test('gets Tucan White Bean recipe', async () => {
  const URL = "https://thewanderlustkitchen.com/tuscan-white-bean-skillet/"
  const actual: any = await getData(URL);
  const expected: any = tuscanWhiteBean;
  expect(actual.name).toEqual(expected.name);
  expect(actual.url).toEqual(expected.url)
  expect(actual.recipeIngredient).toEqual(expected.recipeIngredient);
})