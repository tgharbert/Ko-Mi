const UNICODE_FRACTIONS: Record<string, number> = {
  "\u00BC": 0.25, // ¼
  "\u00BD": 0.5,  // ½
  "\u00BE": 0.75, // ¾
  "\u2153": 1 / 3, // ⅓
  "\u2154": 2 / 3, // ⅔
  "\u2155": 0.2,  // ⅕
  "\u2156": 0.4,  // ⅖
  "\u2157": 0.6,  // ⅗
  "\u2158": 0.8,  // ⅘
  "\u2159": 1 / 6, // ⅙
  "\u215A": 5 / 6, // ⅚
  "\u215B": 0.125, // ⅛
  "\u215C": 0.375, // ⅜
  "\u215D": 0.625, // ⅝
  "\u215E": 0.875, // ⅞
};

const UNIT_ALIASES: Record<string, string> = {
  cup: "cup",
  cups: "cup",
  c: "cup",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  tbsp: "tbsp",
  tbs: "tbsp",
  tbl: "tbsp",
  teaspoon: "tsp",
  teaspoons: "tsp",
  tsp: "tsp",
  ounce: "oz",
  ounces: "oz",
  oz: "oz",
  pound: "lb",
  pounds: "lb",
  lb: "lb",
  lbs: "lb",
  gram: "g",
  grams: "g",
  g: "g",
  kilogram: "kg",
  kilograms: "kg",
  kg: "kg",
  milliliter: "ml",
  milliliters: "ml",
  ml: "ml",
  liter: "l",
  liters: "l",
  l: "l",
  clove: "clove",
  cloves: "clove",
  can: "can",
  cans: "can",
  bunch: "bunch",
  bunches: "bunch",
  pinch: "pinch",
  pinches: "pinch",
  dash: "dash",
  dashes: "dash",
  sprig: "sprig",
  sprigs: "sprig",
  slice: "slice",
  slices: "slice",
  piece: "piece",
  pieces: "piece",
  head: "head",
  heads: "head",
  stalk: "stalk",
  stalks: "stalk",
  stick: "stick",
  sticks: "stick",
  quart: "quart",
  quarts: "quart",
  pint: "pint",
  pints: "pint",
  gallon: "gallon",
  gallons: "gallon",
  package: "package",
  packages: "package",
  pkg: "package",
  jar: "jar",
  jars: "jar",
  bag: "bag",
  bags: "bag",
  box: "box",
  boxes: "box",
  bottle: "bottle",
  bottles: "bottle",
  large: "large",
  medium: "medium",
  small: "small",
};

export type ParsedIngredient = {
  quantity: number | null;
  unit: string | null;
  item: string;
  original: string;
};

function parseFraction(str: string): number | null {
  // "1/2" -> 0.5
  const match = str.match(/^(\d+)\/(\d+)$/);
  if (match) {
    const denom = parseInt(match[2]);
    if (denom === 0) return null;
    return parseInt(match[1]) / denom;
  }
  return null;
}

function parseQuantity(tokens: string[]): { quantity: number | null; rest: string[] } {
  if (tokens.length === 0) return { quantity: null, rest: tokens };

  let total = 0;
  let consumed = 0;

  const first = tokens[0];

  // Check unicode fraction
  if (first.length === 1 && UNICODE_FRACTIONS[first] !== undefined) {
    return { quantity: UNICODE_FRACTIONS[first], rest: tokens.slice(1) };
  }

  // Check if first token ends with a unicode fraction (e.g., "1½")
  const lastChar = first[first.length - 1];
  if (first.length > 1 && UNICODE_FRACTIONS[lastChar] !== undefined) {
    const whole = parseFloat(first.slice(0, -1));
    if (!isNaN(whole)) {
      return { quantity: whole + UNICODE_FRACTIONS[lastChar], rest: tokens.slice(1) };
    }
  }

  // Try parsing as a number or fraction
  const num = parseFloat(first);
  const frac = parseFraction(first);

  if (frac !== null) {
    total = frac;
    consumed = 1;
  } else if (!isNaN(num)) {
    total = num;
    consumed = 1;

    // Check for a following fraction: "1 1/2" -> 1.5
    if (tokens.length > 1) {
      const nextFrac = parseFraction(tokens[1]);
      if (nextFrac !== null) {
        total += nextFrac;
        consumed = 2;
      }
    }
  } else {
    return { quantity: null, rest: tokens };
  }

  return { quantity: total, rest: tokens.slice(consumed) };
}

export default function parseIngredient(input: string): ParsedIngredient {
  const trimmed = input.trim();
  if (!trimmed) {
    return { quantity: null, unit: null, item: "", original: input };
  }

  // Normalize whitespace
  const normalized = trimmed.replace(/\s+/g, " ");
  const tokens = normalized.split(" ");

  const { quantity, rest } = parseQuantity(tokens);

  if (rest.length === 0) {
    return { quantity, unit: null, item: "", original: input };
  }

  // Check if next token is a unit (only when we have a quantity)
  // Strip trailing period (e.g., "tsp." -> "tsp")
  const candidateUnit = rest[0].replace(/\.+$/, "").toLowerCase();
  const unit = quantity !== null ? UNIT_ALIASES[candidateUnit] : undefined;

  if (unit && rest.length > 1) {
    // Check for parenthetical size like "1 (14-ounce) can"
    const item = rest.slice(1).join(" ");
    return { quantity, unit, item: cleanItem(item), original: input };
  }

  // Check for parenthetical pattern: "1 (14-ounce) can tomatoes"
  if (rest[0].startsWith("(")) {
    const closingIdx = rest.findIndex((t) => t.endsWith(")"));
    if (closingIdx >= 0) {
      const afterParen = rest.slice(closingIdx + 1);
      // Check if token after paren is a unit
      if (afterParen.length > 0) {
        const parenUnit = UNIT_ALIASES[afterParen[0].replace(/\.+$/, "").toLowerCase()];
        if (parenUnit) {
          const descriptor = rest.slice(0, closingIdx + 1).join(" ");
          const item = afterParen.slice(1).join(" ");
          return {
            quantity,
            unit: parenUnit,
            item: cleanItem(item ? `${descriptor} ${item}` : descriptor),
            original: input,
          };
        }
      }
      // No unit after paren, treat everything as item
      return { quantity, unit: null, item: cleanItem(rest.join(" ")), original: input };
    }
  }

  // No recognized unit
  return { quantity, unit: null, item: cleanItem(rest.join(" ")), original: input };
}

function cleanItem(item: string): string {
  return item
    .replace(/^,\s*/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
