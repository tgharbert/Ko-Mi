const cheerio = require("cheerio");
const axios = require("axios");

const ldScraper = async (url: string) => {
  try {
    const response = await axios
      .get(url)
      .catch((err: string) => console.error(err));
    const html = response.data;
    // console.log(
    //   "response: *********************************************  ",
    //   html
    // );
    const $ = await cheerio.load(html);
    const jsonLDData: string[] = [];
    $('script[type="application/ld+json"]').each((index, element) => {
      const json = JSON.parse($(element).html());
      jsonLDData.push(json);
    });
    // console.log("jsonLDData: ", jsonLDData);
    return jsonLDData;
  } catch (error) {
    console.error("error retrieving from URL: ", error);
  }
};

export default ldScraper;
