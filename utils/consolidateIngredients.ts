import parseIngredient, { ParsedIngredient } from "./parseIngredient";

type ConsolidatedIngredient = {
  name: string;
  ids: number[];
  location: string | null;
};

const UNIT_TO_TSP: Record<string, number> = {
  tsp: 1,
  tbsp: 3,
  cup: 48,
  pint: 96,
  quart: 192,
  gallon: 768,
  ml: 0.202884,
  l: 202.884,
  oz: 6,
  lb: 96,
  g: 0.067628,
  kg: 67.628,
};

function normalizeItem(item: string): string {
  return item
    .replace(/,.*$/, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ies$/, "y")
    .replace(/oes$/, "o")
    .replace(/es$/, "e")
    .replace(/([^s])s$/, "$1");
}

function formatQuantity(n: number): string {
  const common: [number, string][] = [
    [0.125, "1/8"],
    [0.25, "1/4"],
    [1 / 3, "1/3"],
    [0.5, "1/2"],
    [2 / 3, "2/3"],
    [0.75, "3/4"],
  ];

  const whole = Math.floor(n);
  const frac = n - whole;

  if (frac < 0.01) return whole.toString();

  const match = common.find(([val]) => Math.abs(frac - val) < 0.01);
  if (match) {
    return whole > 0 ? `${whole} ${match[1]}` : match[1];
  }

  // Round to 2 decimal places
  return parseFloat(n.toFixed(2)).toString();
}

function canConvertBetween(unitA: string, unitB: string): boolean {
  return unitA in UNIT_TO_TSP && unitB in UNIT_TO_TSP;
}

function convertToBase(quantity: number, unit: string): number {
  return quantity * (UNIT_TO_TSP[unit] ?? 1);
}

function pickDisplayUnit(unitA: string, unitB: string, totalBase: number): string {
  // Pick the larger unit if the result is >= 1 in that unit, otherwise the smaller
  const factorA = UNIT_TO_TSP[unitA] ?? 1;
  const factorB = UNIT_TO_TSP[unitB] ?? 1;
  const larger = factorA >= factorB ? unitA : unitB;
  const largerFactor = UNIT_TO_TSP[larger] ?? 1;
  if (totalBase / largerFactor >= 1) return larger;
  return factorA < factorB ? unitA : unitB;
}

type ParsedWithMeta = {
  parsed: ParsedIngredient;
  id: number;
  location: string | null;
};

function findMatchingKey(
  key: string,
  groups: Map<string, ParsedWithMeta[]>
): string | null {
  // Exact match
  if (groups.has(key)) return key;

  // Suffix/substring match: "extra-virgin olive oil" matches "olive oil" and vice versa
  for (const existing of groups.keys()) {
    if (existing.startsWith("__raw_")) continue;
    if (existing.endsWith(key) || key.endsWith(existing)) {
      return existing;
    }
  }
  return null;
}

export default function consolidateIngredients(
  ingredients: IngredientWithLocation[]
): ConsolidatedIngredient[] {
  const groups = new Map<string, ParsedWithMeta[]>();

  for (const ing of ingredients) {
    const parsed = parseIngredient(ing.name ?? "");
    const key = normalizeItem(parsed.item);
    if (!key) {
      groups.set(`__raw_${ing.id}`, [{ parsed, id: ing.id, location: ing.location }]);
      continue;
    }

    const matchKey = findMatchingKey(key, groups);
    if (matchKey) {
      groups.get(matchKey)!.push({ parsed, id: ing.id, location: ing.location });
    } else {
      groups.set(key, [{ parsed, id: ing.id, location: ing.location }]);
    }
  }

  const result: ConsolidatedIngredient[] = [];

  for (const [, items] of groups) {
    if (items.length === 1) {
      result.push({
        name: items[0].parsed.original,
        ids: [items[0].id],
        location: items[0].location,
      });
      continue;
    }

    const ids = items.map((i) => i.id);
    const location = items[0].location;

    // Group by unit compatibility
    const unitGroups = groupByUnit(items);
    const parts: string[] = [];

    for (const group of unitGroups) {
      const merged = mergeGroup(group);
      parts.push(merged);
    }

    result.push({
      name: parts.join(" + "),
      ids,
      location,
    });
  }

  return result;
}

function groupByUnit(items: ParsedWithMeta[]): ParsedWithMeta[][] {
  const groups: ParsedWithMeta[][] = [];
  const assigned = new Set<number>();

  for (let i = 0; i < items.length; i++) {
    if (assigned.has(i)) continue;
    const group = [items[i]];
    assigned.add(i);

    const unitA = items[i].parsed.unit;

    for (let j = i + 1; j < items.length; j++) {
      if (assigned.has(j)) continue;
      const unitB = items[j].parsed.unit;

      if (unitA === unitB || (unitA && unitB && canConvertBetween(unitA, unitB))) {
        group.push(items[j]);
        assigned.add(j);
      }
    }
    groups.push(group);
  }
  return groups;
}

function mergeGroup(group: ParsedWithMeta[]): string {
  const first = group[0].parsed;

  // If no quantities at all, just return the first original
  if (group.every((g) => g.parsed.quantity === null)) {
    return first.original;
  }

  const unit = first.unit;

  // All same unit (or all null unit)
  if (group.every((g) => g.parsed.unit === unit)) {
    const total = group.reduce((sum, g) => sum + (g.parsed.quantity ?? 0), 0);
    const qStr = formatQuantity(total);
    if (unit) {
      return `${qStr} ${unit} ${first.item}`;
    }
    return `${qStr} ${first.item}`;
  }

  // Different but convertible units
  let totalBase = 0;
  let displayUnitA = group[0].parsed.unit!;
  for (const g of group) {
    totalBase += convertToBase(g.parsed.quantity ?? 0, g.parsed.unit!);
    displayUnitA = pickDisplayUnit(displayUnitA, g.parsed.unit!, totalBase);
  }
  const finalQty = totalBase / (UNIT_TO_TSP[displayUnitA] ?? 1);
  return `${formatQuantity(finalQty)} ${displayUnitA} ${first.item}`;
}

export { normalizeItem, formatQuantity, type ConsolidatedIngredient };
