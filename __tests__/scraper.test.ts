import gochujangChicken from '@/testData/scraper/gochujangChicken.json'
import getData from "@/utils/scraper";


test('gets Gochujang Chicken recipe', async () => {
  const gochujangChickenURL = "https://www.bonappetit.com/recipe/slow-roast-gochujang-chicken"
  const actual = await getData(gochujangChickenURL);
  const expected = gochujangChicken;

  expect(actual).toEqual(expected);
});