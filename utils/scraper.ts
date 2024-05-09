"use server";

const cheerio = require("cheerio");
const axios = require("axios");

// do I have to use cheerio and axios here?
const ldScraper = async (url: string) => {
  try {
    const response = await axios
      .get(url)
      .catch((err: string) => console.error(err));
    const html = await response.data;
    const $ = await cheerio.load(html);
    const jsonLDData: string[] = [];
    $('script[type="application/ld+json"]').each((index: number, element: string) => {
      const json = JSON.parse($(element).html());
      jsonLDData.push(json);
    });
    if (!jsonLDData) {
      return `${url} is not supported`;
    }
    return jsonLDData;
  } catch (error) {
    console.error("error retrieving from URL: ", error);
  }
};

const getData = async (url: string) => {
  try {
    const result = await ldScraper(url);
    // console.log(result);
    // using this for test info
    // console.log(JSON.stringify(result))
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
