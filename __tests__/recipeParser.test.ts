import getRecipeObject from "@/utils/parseRecipe";
import gochujangChickenResultData from "@/testData/getRecipeObject/gochujangChickenResultData.json";
import gochujangChicken from '@/testData/scraper/gochujangChicken.json'
import mustardPorkTenderloinResultData from "@/testData/getRecipeObject/mustardPorkTenderloin.json"
import mustardPorkTenderloin from '@/testData/scraper/mustardPorkTenderloin.json'
import tuscanWhiteBeanData from '@/testData/getRecipeObject/tuscanWhiteBean.json'
import tuscanWhiteBean from '@/testData/scraper/tuscanWhiteBean.json'


// Bon Appetit
test('gets Gochujang Chicken recipe object', () => {
  const expected = gochujangChickenResultData;
  const actual = getRecipeObject(gochujangChicken);
  expect(actual).toEqual(expected);
});

// NYT Cooking
test('gets Mustard-Glazed Pork Tenderloin recipe object', () => {
  const expected = mustardPorkTenderloinResultData;
  const actual = getRecipeObject(mustardPorkTenderloin)
  expect(actual).toEqual(expected)
})

// the Wanderlust Kithen
test('gets Tuscan White Bean Dish recipe object', () => {
  const expected = tuscanWhiteBeanData;
  const actual = getRecipeObject(tuscanWhiteBean);
  expect(actual).toEqual(expected)
})