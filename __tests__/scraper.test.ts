import gochujangChicken from '@/testData/scraper/gochujangChicken.json'
import getData from "@/utils/scraper";

const gochujangChickenURL = "https://www.bonappetit.com/recipe/slow-roast-gochujang-chicken"

test('gets Gochujang Chicken recipe', async () => {
  const actual = await getData(gochujangChickenURL);
  const expected = gochujangChicken;

  expect(actual).toEqual(expected);
});