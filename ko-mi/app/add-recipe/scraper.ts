"use server";

const cheerio = require("cheerio");
const axios = require("axios");

const ldScraper = async (url: string) => {
  try {
    const response = await axios
      .get(url)
      .catch((err: string) => console.error(err));
    const html = response.data;
    const $ = await cheerio.load(html);
    const jsonLDData: string[] = [];
    $('script[type="application/ld+json"]').each((index, element: string) => {
      const json = JSON.parse($(element).html());
      jsonLDData.push(json);
    });
    return jsonLDData;
  } catch (error) {
    console.error("error retrieving from URL: ", error);
  }
};

const getData = async (url: string) => {
  try {
    const result = await ldScraper(url);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getData;
