import getRecipeObject from "@/utils/parseRecipe";
import gochujangChickenResultData from "@/testData/getRecipeObject/gochujangChickenResultData.json";
import gochujangChicken from '@/testData/scraper/gochujangChicken.json'


test('gets Gochujang Chicken recipe object', async () => {
  const expected = gochujangChickenResultData;
  const actual = getRecipeObject(gochujangChicken);
  expect(actual).toEqual(expected);
});