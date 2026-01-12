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
    if (!jsonLDData || jsonLDData.length === 0) {
      return null;
    }
    // getting raw json for testing
    // console.log(JSON.stringify(jsonLDData));
    return jsonLDData;
  } catch (error) {
    console.error("error retrieving from URL: ", error);
    return null;
  }
};

// Custom scraper for alisoneroman.com
const alisonRomanScraper = async (url: string, $: any) => {
  try {
    // Extract title
    const name = $('h1.gh-article-title').text().trim();

    // Extract description
    const description = $('p.gh-article-excerpt').text().trim();

    // Extract yield - look for "YIELD — " pattern
    let recipeYield = 1;
    const yieldText = $('p').filter((i: number, el: any) => {
      return $(el).text().includes('YIELD');
    }).text();
    const yieldMatch = yieldText.match(/YIELD\s*—\s*(.+)/);
    if (yieldMatch) {
      // Extract number from text like "4 servings"
      const yieldNum = yieldMatch[1].match(/\d+/);
      recipeYield = yieldNum ? parseInt(yieldNum[0]) : 1;
    }

    // Extract ingredients
    const ingredientsSection = $('h2#ingredients');
    const ingredientsList = ingredientsSection.next('ul');
    const recipeIngredient: string[] = [];
    ingredientsList.find('li').each((i: number, el: any) => {
      const text = $(el).text().trim();
      if (text) {
        recipeIngredient.push(text);
      }
    });

    // Extract instructions
    const preparationSection = $('h2#preparation');
    let instructionsList = preparationSection.next();
    // Skip iframe if present (embedded video)
    if (instructionsList.is('figure')) {
      instructionsList = instructionsList.next();
    }
    const instructions: string[] = [];
    if (instructionsList.is('ol')) {
      instructionsList.find('li').each((i: number, el: any) => {
        const text = $(el).text().trim();
        if (text) {
          instructions.push(text);
        }
      });
    }

    // Extract DO AHEAD section if present
    const doAheadText = $('p').filter((i: number, el: any) => {
      return $(el).text().includes('DO AHEAD:');
    }).text();
    if (doAheadText) {
      instructions.push(doAheadText);
    }

    // Extract image
    let image = '';
    const imgElement = $('picture.gh-article-image img');
    if (imgElement.length) {
      image = imgElement.attr('src') || '';
      // Convert relative URL to absolute if needed
      if (image && !image.startsWith('http')) {
        const urlObj = new URL(url);
        image = `${urlObj.protocol}//${urlObj.host}${image}`;
      }
    }

    // Extract keywords from tags
    const keywords: string[] = [];
    const bodyClass = $('body').attr('class') || '';
    const tagMatches = bodyClass.match(/tag-([a-z0-9-]+)/g);
    if (tagMatches) {
      tagMatches.forEach((tag: string) => {
        const keyword = tag.replace('tag-', '').replace(/-/g, ' ');
        // Filter out system tags
        if (!keyword.includes('hash') && !keyword.includes('sqs') && keyword !== 'recipes') {
          keywords.push(keyword);
        }
      });
    }

    return {
      name,
      description,
      recipeIngredient,
      instructions,
      recipeYield,
      image,
      keywords,
      url,
      // Default values for missing fields
      aggregateRating: 0,
      author: 'Alison Roman',
      category: keywords.length > 0 ? keywords : ['Main Course'],
      cookTime: '',
      prepTime: '',
      totalTime: '',
      publisherName: 'Alison Roman',
      publisherLogo: '',
      publisherUrl: 'https://www.alisoneroman.com',
    };
  } catch (error) {
    console.error('Error in alisonRomanScraper:', error);
    return null;
  }
};

const getData = async (url: string) => {
  try {
    const response = await axios.get(url).catch((err: string) => {
      console.error(err);
      return null;
    });

    if (!response) {
      return `${url} is not supported`;
    }

    const html = response.data;
    const $ = cheerio.load(html);

    // First try JSON-LD scraping
    const jsonLDResult = await ldScraper(url);
    if (jsonLDResult && jsonLDResult.length > 0) {
      return jsonLDResult;
    }

    // If no JSON-LD, check for custom scrapers
    if (url.includes('alisoneroman.com')) {
      const customResult = await alisonRomanScraper(url, $);
      if (customResult) {
        return [customResult];
      }
    }

    return `${url} is not supported`;
  } catch (error) {
    console.error(error);
    return `${url} is not supported`;
  }
};

export default getData;
