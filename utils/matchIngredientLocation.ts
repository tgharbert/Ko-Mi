import { ingredientMap, COMPOUND_PHRASES } from "./ingredientMap";

const SKIP_WORDS = new Set([
  "cup", "cups", "tablespoon", "tablespoons", "tbsp", "teaspoon",
  "teaspoons", "tsp", "ounce", "ounces", "oz", "pound", "pounds", "lb",
  "lbs", "large", "small", "medium", "fresh", "dried", "chopped", "minced",
  "sliced", "diced", "whole", "can", "canned", "frozen", "organic", "to",
  "taste", "for", "of", "a", "an", "the", "or", "and", "with", "about",
  "approximately", "finely", "roughly", "thinly", "optional", "divided",
  "plus", "more", "extra", "packed", "loosely", "heaping", "level",
  "inch", "inches", "piece", "pieces",
]);

function stemWord(word: string): string[] {
  const candidates = [word];
  if (word.endsWith("ies")) candidates.push(word.slice(0, -3) + "y");
  if (word.endsWith("oes")) candidates.push(word.slice(0, -2));
  if (word.endsWith("es") && !word.endsWith("ies") && !word.endsWith("oes")) {
    candidates.push(word.slice(0, -2));
  }
  if (word.endsWith("s") && !word.endsWith("ss") && !word.endsWith("es")) {
    candidates.push(word.slice(0, -1));
  }
  return candidates;
}

export function matchLocation(name: string): string {
  const lower = name.toLowerCase().replace(/\(.*?\)/g, "").trim();

  // Check compound phrases first
  for (const [phrase, location] of COMPOUND_PHRASES) {
    if (lower.includes(phrase)) {
      return location;
    }
  }

  // Split into words and check each
  const words = lower.split(/\s+/);
  for (const raw of words) {
    const word = raw.replace(/[^a-zà-ÿ-]/g, "");
    if (!word || SKIP_WORDS.has(word)) continue;

    const stems = stemWord(word);
    for (const stem of stems) {
      const loc = ingredientMap.get(stem);
      if (loc) return loc;
    }
  }

  return "other";
}

export function matchLocations(ingredients: IngredientData[]): LocData[] {
  const results: LocData[] = [];
  for (const ing of ingredients) {
    results.push({
      ingredientId: ing.id,
      store: matchLocation(ing.name),
      home: "",
    });
  }
  return results;
}
